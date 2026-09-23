const mongoose = require("mongoose");

const { Schema } = mongoose;

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    topics: {
      type: ["String"],
      required: true,
    },
    visibleTestCases: [
      {
        input: {
          type: String,
          default: "",
        },
        output: {
          type: String,
          default: "",
        },
        explanation: {
          type: String,
          default: "",
        },
      },
    ],
    hiddenTestCases: [
      {
        input: {
          type: String,
          default: "",
        },
        output: {
          type: String,
          default: "",
        },
      },
    ],
    boilerPlateCode: [
      {
        language: {
          type: String,
          enum: ["java", "cpp", "python"],
          required: true,
        },
        boilerPlate: {
          type: String,
          required: true,
        },
      },
    ],
    referenceSolution: [
      {
        language: {
          type: String,
          enum: ["java", "cpp", "python"],
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
      },
    ],
    problemCreator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },{ timestamps: true },
);

const Problem = mongoose.model("problems", problemSchema);
module.exports = Problem;
