const { PDFParse } = require("pdf-parse")
const { generateInterviewReport } = require("../../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req, res) {
    const resumeFile = req.files && req.files.resume ? req.files.resume[0] : null;
    if (!resumeFile) {
        return res.status(400).json({ Message: "Resume file is required" });
    }
    const parser = new PDFParse({ data: resumeFile.buffer });
    const resumeContent = await parser.getText();
    await parser.destroy();
    const {selfDescription,jobDescription} = req.body
    const interviewReportByAi = await generateInterviewReport(
        jobDescription,
        resumeContent.text,
        selfDescription
    )
    const interviewReport = await interviewReportModel.create({
        user : req.user.id,
        jobDescription : jobDescription,
        resume : resumeContent.text,
        selfDescription : selfDescription,
        ...interviewReportByAi
    })
    res.status(201).json({
        Message : "Interview Report Generated Successfully",
        InterviewReport : interviewReport
    })
}


module.exports = {
    generateInterviewReportController
}