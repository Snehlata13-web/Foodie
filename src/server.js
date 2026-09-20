const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
const foodRoutes = require('./routes/foodRoutes.js');
app.use('/api', foodRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});