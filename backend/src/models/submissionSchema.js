const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema(
  {
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "problems",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["java", "cpp", "python"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "failed"
      ],
      required: true,
    },
    errMessage: {
      type: String,
      default:null
    },
    runtime: {
      type: Number,
      required: true,
    },
    testcasesPassed: {
      type: Number,
      required: true,
    },
    totalTestcases: {
      type: Number,
      required: true,
    },
    memory: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

submissionSchema.index({userId:1 , problemId:1});

const Submission = mongoose.model("submission", submissionSchema);
module.exports = Submission;

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
