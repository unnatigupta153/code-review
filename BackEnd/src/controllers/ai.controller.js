const aiService = require("../services/ai.service")


module.exports.getReview = async (req, res) => {

    const code = typeof req.body?.code === "string" ? req.body.code.trim() : "";

    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }
    if (code.length > 50000) {
        return res.status(413).json({ error: "Code must be 50,000 characters or less" });
    }

    try {
        const response = await aiService(code);
        res.json({ review: response });
    } catch (error) {
        console.error("Code review failed:", error.message);
        res.status(error.statusCode || 500).json({
            error: error.statusCode === 503 ? error.message : "Unable to generate a code review"
        });
    }

}
