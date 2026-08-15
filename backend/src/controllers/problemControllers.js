const axios = require("axios");
const {
  getFileNameByLanguage,
  submitBatch,
  validateTestCases,
} = require("../utils/problemUtility");
const Problem = require("../models/problemSchema");

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    topics,
    visibleTestCases,
    hiddenTestCases,
    boilerPlateCode,
    referenceSolution,
  } = req.body;
  
  try {
    let isValid = true;
    let validationError = null;

    validateTestCases(referenceSolution, visibleTestCases);

    for (const { language, code } of referenceSolution) {
      const submissions = {
        language: language,
        stdin: visibleTestCases.map(({ input }) => input),
        files: [
          {
            name: getFileNameByLanguage(language),
            content: code,
          },
        ],
      };

      const submitResult = await submitBatch(submissions);

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

        if (result.stdout?.trim() !== visibleTestCases[index].output.trim()) {
          validationError =
            `Wrong output in ${language}, test case ${index + 1}. ` +
            `Expected: ${visibleTestCases[index].output}, ` +
            `Got: ${result.stdout}`;

          return false;
        }

        return true;
      });

      if (!languageValid) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Problem validation failed",
        error: validationError,
      });
    }

    req.body.problemCreator = req.user._id;

    await Problem.create(req.body);

    res.status(201).json({
      success: true,
      message: "Problem created successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating problem",
      error: err.message,
    });
  }
};

const updateProblem = async (req, res) => {
  const { id } = req.params;
  
  if(!id){
    return res.status(400).send("Problem id is Required!");
  }

  const {
    title,
    description,
    difficulty,
    topics,
    visibleTestCases,
    hiddenTestCases,
    boilerPlateCode,
    referenceSolution,
  } = req.body;

  try {
    let isValid = true;
    let validationError = null;

    validateTestCases(referenceSolution, visibleTestCases);

    for (const { language, code } of referenceSolution) {
      const submissions = {
        language: language,
        stdin: visibleTestCases.map(({ input }) => input),
        files: [
          {
            name: getFileNameByLanguage(language),
            content: code,
          },
        ],
      };

      const submitResult = await submitBatch(submissions);

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

        if (result.stdout?.trim() !== visibleTestCases[index].output.trim()) {
          validationError =
            `Wrong output in ${language}, test case ${index + 1}. ` +
            `Expected: ${visibleTestCases[index].output}, ` +
            `Got: ${result.stdout}`;

          return false;
        }

        return true;
      });

      if (!languageValid) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Problem validation failed",
        error: validationError,
      });
    }

    await Problem.findByIdAndUpdate(id, req.body, {returnDocument: "after",runValidators: true,});

    res.status(201).json({
      success: true,
      message: "Problem updated successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating problem",
      error: err.message,
    });
  }
};

const deleteProblem = async (req, res) => {
  try{
    const {id} = req.params;

  if(!id){
    return res.status(400).send("Problem id is Required");
  }
    

  const deletedProblem = await Problem.findByIdAndDelete(id);

  if(!deletedProblem){
    return res.status(404).send("No Such Problem found!");
  }

  res.status(200).send("Problem deleted Successfully");
  }catch(err){
      res.status(500).send("Error: " + err);
  }
  
};

module.exports = { createProblem, updateProblem, deleteProblem};
