const mongoose = require("mongoose");

const { Schema } = mongoose;

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
    topics: {
      type: String,
      enum: [
        "arrays",
        "linked list",
        "trees",
        "priority queue",
        "heap",
        "hash table",
        "hash map",
        "dynamic programming",
        "graphs",
        "backtracking",
        "stack",
        "queue",
      ],
    },
    visibleTestCase: [{
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
      explanation: {
        type: true,
        required: true,
      },
    }],
    hiddenTestCase: [{
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
    }],
    initialCode:[{
        language:{
            type:String,
            required:true
        },
        boilerPlate:{
            type:String,
            required:true
        }
    }],
    problemCreator:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }
  },
  { timestamps: true },
);

module.exports = problemSchema;
