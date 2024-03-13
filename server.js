const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let stories = [];



app.get('/get-stories', (req, res) => {
    res.json(stories);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Kết nối với MongoDB
const uri = "mongodb+srv://hackerlongxuyen:<Kimanh@1999>@novel.7qofwkc.mongodb.net/?retryWrites=true&w=majority&appName=Novel";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// Xác định một schema và model nếu cần
const storySchema = new mongoose.Schema({
    title: String,
    content: String
});

const Story = mongoose.model('Story', storySchema);

app.post('/add-story', async (req, res) => {
    const { title, content } = req.body;
    const newStory = new Story({ title, content });
   
    try {
        await newStory.save();
        res.status(200).send("Truyện đã được lưu vào cơ sở dữ liệu.");
       
        stories.push({ title, content });
    } catch (error) {
        res.status(500).send("Đã xảy ra lỗi khi lưu truyện vào cơ sở dữ liệu.");
    }
});

app.get('/get-stories', async (req, res) => {
    const stories = await Story.find({});
    res.json(stories);
});
