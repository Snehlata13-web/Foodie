const foods = require("../database/data.json");
const { getEmbedding } = require("../utils/getEmbeddings.js");

async function buildFoodList() {
  const foodlist = [];

  for (const food of foods) {
    const embedding = await getEmbedding(food.description);
    foodlist.push({ ...food, embedding });
    console.log(`Embedding generated for: ${food.title}`);
  }

  return foodlist;
}
function cosineSimilarity(a, b) {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        magnitudeA += a[i] ** 2;
        magnitudeB += b[i] ** 2;
    }

    return dotProduct /(Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

async function foodMatch(req, res) {
  const { query } = req.body;
  const queryEmbedding = await getEmbedding(query);
  const foodlist = await buildFoodList();
  const recommendations = [];
  for(const food of foodlist) {
      const similarity = cosineSimilarity(queryEmbedding, food.embedding);
      recommendations.push({ food, similarity });
  }
  recommendations.sort((a, b) => b.similarity - a.similarity);
  res.json(recommendations.slice(0, 3).map(r => ({ title: r.food.title, description: r.food.description })));
}
module.exports = { buildFoodList, foodMatch };
