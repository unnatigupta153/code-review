const { GoogleGenerativeAI } = require("@google/generative-ai");

const systemInstruction = `
You are a senior code reviewer. Review submitted code for correctness, security,
performance, maintainability, readability, testing, and scalability.
Be precise and constructive. Explain why issues matter and provide fixes or
refactored examples where useful. Structure the response with Markdown headings:
Summary, Issues, Recommended Fixes, and Testing Suggestions.
Do not claim code was executed unless it was actually executed.
`;

function getModel() {
    const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_KEY || "").trim();
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
        const error = new Error("GEMINI_API_KEY is not configured");
        error.statusCode = 503;
        throw error;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
        systemInstruction
    });
}

async function generateContent(code) {
    const result = await getModel().generateContent(code);
    return result.response.text();
}

module.exports = generateContent;
