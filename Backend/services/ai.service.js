const {GoogleGenAI, Type} = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: { type: Type.INTEGER, description: "A Score ranging from 0-100 indicating the overall match between the candidate's resume and the job describe" },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical Questions that can be asked to the candidate in the interview based on his resume and job describe along with their intentions and how to answer them.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "Technical question which can be asked to the candidate in the interview based on his resume and job describe" },
                    intention: { type: Type.STRING, description: "Intention behind the technical question" },
                    expectedAnswer: { type: Type.STRING, description: "How to answer this question, what points should be touched upon, etc." }
                },
                required: ["question", "intention", "expectedAnswer"]
            }
        },
        behaviouralQuestions: {
            type: Type.ARRAY,
            description: "Behavioural Questions that can be asked to the candidate in the interview based on his resume and job describe along with their intentions and how to answer them.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "Behavioural question which can be asked to the candidate in the interview based on his resume and job describe" },
                    intention: { type: Type.STRING, description: "Intention behind the behavioural question" },
                    expectedAnswer: { type: Type.STRING, description: "How to answer this question, what points should be touched upon, etc." }
                },
                required: ["question", "intention", "expectedAnswer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "List of skill gaps found in the candidate's resume and the severity of each skill gap",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "Skill which is missing in the candidate's resume and is required for the job" },
                    severity: { type: Type.STRING, description: "Severity of the skill gap", enum: ["low", "medium", "high"] }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "Day of the week for which the preparation plan is to be created" },
                    focus: { type: Type.STRING, description: "Focus area for the day" },
                    tasks: {
                        type: Type.ARRAY,
                        description: "Tasks for the day",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                task: { type: Type.STRING, description: "Task to be performed on the day" },
                                status: { type: Type.STRING, description: "Status of the task", enum: ["pending", "completed"] }
                            },
                            required: ["task", "status"]
                        }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: ["matchScore", "technicalQuestions", "behaviouralQuestions", "skillGaps", "preparationPlan"]
}

async function generateInterviewReport(jobdescribe, resume, selfdescribe)
{
    const prompt = `
        You are an expert career coach and interviewer.

        Your task: Analyze the candidate's resume against the job describe and generate a comprehensive JSON-based interview report.

        INPUTS:
        - Resume: ${resume}
        - Job describe: ${jobdescribe}
        - Self describe: ${selfdescribe}

        OUTPUT REQUIREMENTS (JSON only):
        Return a JSON object with the following structure:

        {
        matchScore: number (0-100),
        technicalQuestions: array<{
            question: string,
            intention: string,
            expectedAnswer: string
        }>,
        behaviouralQuestions: array<{
            question: string,
            intention: string,
            expectedAnswer: string
        }>,
        skillGaps: array<{
            skill: string,
            severity: "low" | "medium" | "high"
        }>,
        preparationPlan: array<{
            day: number,
            focus: string,
            tasks: array<{
            task: string,
            status: "pending" | "completed"
            }>
        }>
        }

        Constraints:
        - Technical questions must focus on the candidate's resume, projects, and tech stack.
        - Behavioural questions should assess soft skills, culture fit, and experience.
        - Skill gaps must be specific and actionable.
        - Preparation plan should be realistic (e.g., 3-7 days depending on your discretion).
        - All responses must be in English.
        - Output MUST be valid JSON.
        `;

    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents: prompt,
        config : {
            responseMimeType : "application/json",
            responseSchema : interviewReportSchema
        }
    });
    return JSON.parse(response.text);
} 

module.exports = {
    generateInterviewReport
}