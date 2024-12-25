const mongoose = require('mongoose');

const trainingPlanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
});

const TrainingPlan = mongoose.model('TrainingPlan', trainingPlanSchema);
module.exports = TrainingPlan;