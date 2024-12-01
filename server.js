const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/reviews', { useNewUrlParser: true, useUnifiedTopology: true });

const reviewSchema = new mongoose.Schema({
    userId: String,
    content: String,
    rating: Number
});
const Review = mongoose.model('Review', reviewSchema);

app.use(bodyParser.json());

// Корневой маршрут
app.get('/', (req, res) => {
    res.send('Welcome to the Reviews API');
});

// Маршрут для добавления отзыва
app.post('/reviews', async (req, res) => {
    const { userId, content, rating } = req.body;
    const review = new Review({ userId, content, rating });
    await review.save();
    res.send('Review added');
});

// Маршрут для получения всех отзывов
app.get('/reviews', async (req, res) => {
    const reviews = await Review.find();
    res.json(reviews);
});

// Маршрут для получения отзыва по ID
app.get('/reviews/:id', async (req, res) => {
    const review = await Review.findById(req.params.id);
    res.json(review);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
