const Submission = require("../models/submissionSchema");
const Problem = require("../models/problemSchema");
const { getSubmissions, submitBatch } = require("../utils/problemUtility");

const submitProblem = async (req, res) => {
  try {
    const userId = req.user._id;
    const problemId = req.params.id;
    const { code, language } = req.body;
    let validationError = null;
    let testcasesPassed = 0;
    let runtime = 0;
    let memory = 0;

    if (!userId || !problemId || !code || !language) {
      return res.status(400).send("Field(s) is/are missing!");
    }

    const foundProblem = await Problem.findById(problemId);

    if (!foundProblem) {
      return res.status(404).send("Problem not found");
    }

    //A pending state submission (in case of oneCompiler server failure) for no loss of submission info
    const submittedCode = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: "pending",
      totalTestcases: foundProblem.hiddenTestCases.length,
      runtime: 0,
      memory: 0,
      testcasesPassed: 0,
      errMessage: "",
    });

    const { hiddenTestCases } = foundProblem;

    const submissions = getSubmissions(hiddenTestCases, language, code);

    const submitResult = await submitBatch(submissions);

    // Calculate resource usage from all results
    submitResult.forEach((result) => {
      runtime = Math.max(runtime, result.executionTime);
      memory = Math.max(memory, result.memoryUsed / 1024);
    });

    memory = Number(memory.toFixed(2));

    // Validate submission
    const languageValid = submitResult.every((result, index) => {
      if (result.status !== "success") {
        validationError = `Submission failed for ${language}`;
        return false;
      }

      if (result.stderr !== null) {
        validationError = `Error in ${language}, test case ${index + 1}: ${result.stderr}`;
        return false;
      }

      if (result.exception !== null) {
        validationError = `Exception in ${language}, test case ${index + 1}: ${result.exception}`;
        return false;
      }

      if (result.stdout?.trim() !== hiddenTestCases[index].output.trim()) {
        validationError =
          `Wrong output in ${language}, test case ${hiddenTestCases[index].input}. ` +
          `Expected: ${hiddenTestCases[index].output}, ` +
          `Got: ${result.stdout}`;

        return false;
      }

      testcasesPassed++;
      return true;
    });

    submittedCode.errMessage = validationError;
    submittedCode.runtime = runtime;
    submittedCode.memory = memory;
    submittedCode.testcasesPassed = testcasesPassed;

    if (!languageValid) {
      submittedCode.status = "failed";
      await submittedCode.save();
      return res.status(200).json({
        result: submittedCode, 
      });
    }

    submittedCode.status = "accepted";
    await submittedCode.save();

    //if accepted then let us save it to the problemsSolvedByUser in the userSchema
    // req.user refers to the user in the schema
    if (!req.user.problemSolved.includes(problemId)) {
      req.user.problemSolved.push(problemId);
      await req.user.save();
    }

    res.status(201).json({
      result: submittedCode,
    });
  } catch (err) {
    res.status(500).send("Internal server error : " + err);
  }
};

const runProblem = async (req, res) => {
  try {
    const userId = req.user._id;
    const problemId = req.params.id;
    const { code, language } = req.body;

    if (!userId || !problemId || !code || !language) {
      return res.status(400).send("Field(s) is/are missing!");
    }

    const foundProblem = await Problem.findById(problemId);

    if (!foundProblem) {
      return res.status(404).send("Problem not found");
    }

    const { visibleTestCases } = foundProblem;

    const submissions = getSubmissions(visibleTestCases, language, code);

    const submitResult = await submitBatch(submissions);

    submitResult.forEach((result, index) => {
      if (result.stdout?.trim() !== visibleTestCases[index].output.trim()) {
        result.stderr =
          `Wrong Answer ` +
          `Expected: ${visibleTestCases[index].output}, ` +
          `Got: ${result.stdout}`;
      }
    });

    res.status(201).send(submitResult);
  } catch (err) {
    res.status(500).send("Internal server error : " + err);
  }
};

module.exports = { submitProblem, runProblem };

//An example of submission result by onecompiler
// {
//     status: 'success',   //ye hamesha 'success' hi aata hai agar server failure naa hua toh
//     exception: null,     // ye dega tle , mle etc
//     stdout: '50\n',
//     stderr: null,        //compilation error etc
//     compilationTime: 0,
//     executionTime: 12,
//     memoryUsed: 9816,
//     stdin: '20 30'
//   }
