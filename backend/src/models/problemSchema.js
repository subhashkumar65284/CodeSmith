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
      enum:["math","arrays","hash table","linked list","stack","queue","two pointers","prefix sum","trees","dynamic programming","tries","segment trees"],
      required: true,
    },
    visibleTestCases: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
          required: true,
        },
      },
    ],
    hiddenTestCases: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
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
