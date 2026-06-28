const mongoose = require("mongoose");

/**
 * 1) Stuffs from the user side:
 *  -  job description schema : String
 *  - resume text : String
 *  - self description : String
 * 
 * 2) Stuffs we will be generating using the AI:
 *  - match Score : number
 * 
 * - technical questions : [{
 *          question : "",
 *          intention behind this question : "",
 *          expected answer : ""
 *              }]
 * - behavioural questions : [{
 *          question : "",
 *          intention behind this question : "",
 *          expected answer : ""}]
 * - skill gaps : [{
 *          skill : "",
 *          severity : "low|medium|high"
 *              }]
 * - preparation plan : [{
 *          day : Number,
 *          focus : String,
 *          tasks : [{}]      
 *               }]*/

const technicalQuestionSchema = new mongoose.Schema({
    question : 
    {
        type : String,
        required : [true, "Technical Question is    required"] 
    },
    intention : 
    {
        type : String,
        required : [true, "Intention behind Technical Question is required"]
    },
    expectedAnswer :
    {
        type : String,
        required : [true, "Expected Answer is required"]
    }
},
{
    _id : false
})

const behaviouralQuestionSchema = new mongoose.Schema({
    question : 
    {
        type : String,
        required : [true, "Behavioural Question is    required"] 
    },
    intention : 
    {
        type : String,
        required : [true, "Intention behind Behavioural Question is required"]
    },
    expectedAnswer :
    {
        type : String,
        required : [true, "Expected Answer is required"]
    }
},
{
    _id : false
})

const skillGapSchema = new mongoose.Schema({
    skill :
    {
        type : String,
        required : [true, "Skill is required"]
    },
    severity : 
    {
        type : String,
        enum : ["low", "medium", "high"],
        required : [true, "Severity is required"]
    }
},
{
    _id : false
})

const taskSchema = new mongoose.Schema({
    task : {
        type : String,
        required : [true, "Task is required"]
    },
    status : {
        type : String,
        enum : ["pending", "completed"],
        default : "pending"
    }
},{
    _id : false
})

const preparationPlanSchema = new mongoose.Schema({
    day : {
        type : Number,
        required : [true, "Day is required"]
    },
    focus : {
        type : String,
        required : [true, "Focus is required"]
    },
    tasks : [taskSchema]
},
{
    _id : false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required : true
    },
    resume : {
        type : String,
    },
    selfDescription : {
        type : String,
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100
    },
    technicalQuestions : [technicalQuestionSchema],
    behaviouralQuestions : [behaviouralQuestionSchema],
    skillGaps : [skillGapSchema],
    preparationPlan : [preparationPlanSchema]


},{
    timestamps : true
})

const InterviewReportModel = new mongoose.model("InterviewReport", interviewReportSchema)

module.exports = InterviewReportModel