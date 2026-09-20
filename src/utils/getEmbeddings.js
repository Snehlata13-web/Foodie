require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function getEmbedding(text) {
    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: text,
        config:{
            outputDimensionality: 512
        }
    });
    
    return response.embeddings[0].values;
}
module.exports = { getEmbedding };

