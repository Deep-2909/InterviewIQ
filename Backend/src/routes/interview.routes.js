const express = require("express")
const { authUser } = require("../middlewares/auth.middleware")
const interviewRouter = express.Router()
const interviewController = require("../controllers/interview.controller")
const {upload} = require("../middlewares/file.middleware")

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description, resume PDF and Job description.
 * @access Private 
 */
interviewRouter.post("/", authUser, upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'jobDescription', maxCount: 1 }]), interviewController.generateInterviewReportController)
    

module.exports = interviewRouter