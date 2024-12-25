const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/userRoutes');
const trainingPlanRoutes = require('./Routes/trainingPlanRoutes')
const recipeRoutes = require('./Routes/recipeRoutes')

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/trainingplans', trainingPlanRoutes)
app.use('/api/recipes', recipeRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});