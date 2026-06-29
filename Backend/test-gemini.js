require("dotenv").config();
const { generateInterviewReport } = require("./services/ai.service");
async function test() {
    const res = await generateInterviewReport("Job: Node.js Backend Dev", "Resume: Node.js Dev", "Self: Node.js Dev");
    console.log(JSON.stringify(res, null, 2));
}
test().catch(console.error);
