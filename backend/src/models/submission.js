const mongoose = require("mongoose");
const {Schema} = mongoose;

const submissionSchema = new Schema({
    problemId:{
        type:Schema.Types.ObjectId,
        ref:'problems',
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        enum: ["java", "cpp", "python"],
        required:true
    },
    status:{
        type:String,
        required:true
    },
    errMessage:{
        type:String,
        required:true
    },
    runtime:{
        type:String,
        required:true
    },
    testcasesPassed:{
        type:String,
        required:true
    },
    totalTestCases:{
        type:String,
        required:true
    },
    memory:{
        type:String,
        required:true
    }

},{timestamps:true});


const Submission = mongoose.model("submission", submissionSchema);
module.exports = Submission;


//An example of submission result by onecompiler
// {
//     status: 'success',
//     exception: null,
//     stdout: '50\n',
//     stderr: null,
//     compilationTime: 0,
//     executionTime: 12,
//     memoryUsed: 9816,
//     stdin: '20 30'
//   }