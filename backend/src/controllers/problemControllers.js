const axios = require("axios");
const {
  getFileNameByLanguage,
  submitBatch,
} = require("../utils/problemUtility");
const Problem = require("../models/problemSchema");
const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    topics,
    visibleTestCase,
    hiddenTestCase,
    initialCode,
    problemCreator,
    acceptedCode,
  } = req.body;

  //Saving a code to db directly -> not a good choice
  //check with the visible testcases
  try {
    let isValid = true;
    for (const { language, code } of acceptedCode) {
      const submissions = {
        language: language,
        stdin: visibleTestCase.map(({ input }) => input),
        files: [
          {
            name: getFileNameByLanguage(language),
            content: code,
          },
        ],
      };

      const submitResult = await submitBatch(submissions);

      const languageValid = submitResult.every((result, index) => {
        if (result.status !== "success") return false;

        if (result.stderr !== null) return false;

        if (result.exception !== null) return false;

        if (result.stdout?.trim() !== visibleTestCase[index].output.trim()) {
          return false;
        }

        return true;
      });

      if (!languageValid) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      req.body.problemCreator = req.user._id;
      await Problem.create(req.body);
      res.status(201).send("Problem created successfully!");
    } else 
      throw new Error("Error creating Problem");
  } catch (err) {
    res.send("Error Occured : " + err);
  }
};

module.exports = createProblem;
