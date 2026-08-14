const mongoose = require("mongoose");

const { Schema } = mongoose;

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["basic","easy", "medium", "hard"],
      required:true
    },
    topics: {
      type: [String],
      enum: [
        "math",
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
        "sorting"
      ],
      required:true
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
        type: String,
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
    boilerPlateCode:[{
        language:{
            type:String,
            enum:["java","cpp","python"],
            required:true
        },
        boilerPlate:{
            type:String,
            required:true
        }
    }],
    referenceSolution:[{
      language:{
        type:String,
        enum:["java","cpp","python"],
        required:true
      },
      code:{
        type:String,
        required:true
      }
    }],
    
    problemCreator:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }

  },{ timestamps: true });

  const Problem = mongoose.model("problems",problemSchema);
  module.exports = Problem;
