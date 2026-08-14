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
    boilerPlateCode,
    referenceSolution,
  } = req.body;

  try {
    let isValid = true;
    let validationError = null;

    for (const { language, code } of referenceSolution) {

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

        if (result.status !== "success") {
          validationError = `Submission failed for ${language}`;
          return false;
        }

        if (result.stderr !== null) {
          validationError =
            `Error in ${language}, test case ${index + 1}: ${result.stderr}`;
          return false;
        }

        if (result.exception !== null) {
          validationError =
            `Exception in ${language}, test case ${index + 1}: ${result.exception}`;
          return false;
        }

        if (
          result.stdout?.trim() !==
          visibleTestCase[index].output.trim()
        ) {
          validationError =
            `Wrong output in ${language}, test case ${index + 1}. ` +
            `Expected: ${visibleTestCase[index].output}, ` +
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

module.exports = createProblem;
