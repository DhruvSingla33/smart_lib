require("dotenv").config();
const cors= require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Book = require("./models/Books");
const Post = require("./models/Posts");
const Video = require("./models/Video");
const multer = require("multer");
const fs = require("fs");
let {PythonShell} = require('python-shell')
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require('path');



// Construct the absolute path to the Python script using __dirname
const scriptPath = path.join(__dirname, 'test.py');
connectDB();
app.use(cors());

app.use(express.urlencoded({ extended: true } ));
app.use(express.json());

app.use("/uploads", express.static("uploads"));





app.post("/python", async (req, res) => {
  const code = req.body.value;
  const input = req.body.input;
  const outpu = req.body.output;
  const testCaseResults = [];

  fs.writeFileSync("test.py", code);


  const inputArray =input.split(' ').map(Number);

    console.log(inputArray);
      let output = parseInt(outpu);
      inputArray.push(output); 
      console.log(inputArray);
  const options = {
    mode: "text",
    pythonOptions: ["-u"],
    args: inputArray,
};

const pythonResults = await PythonShell.run("test.py", options);
testCaseResults.push(pythonResults);
console.log(testCaseResults );
res.json({ testCaseResults });
});
app.get('/api/videos', async (req, res) => {
  try {

    const videos = await Video.find();
    
 
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error });
  }
});
app.get('/api/videos/find/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    console.log(video);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
});
app.get('/api/posts/find/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log("hello");
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});
app.get('/api/posts', async (req, res, next) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});
// Comment schema and model
const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});
const Comment = mongoose.model("Comment", commentSchema);

// Route to get all comments
app.get("/api/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Route to post a new comment
app.post("/api/comments", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Comment text is required" });

  try {
    const newComment = new Comment({ text });
    await newComment.save();
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to save comment" });
  }
});


app.get("/api/books/:slug", async (req, res) => {
  try {
    const slugParam = req.params.slug;
    const data = await Book.findOne({ slug: slugParam});
    if(!data) {
      throw new Error("Error while fetching data for a book");
    }

    res.status(201).json(data);

  } catch (error) {
    res.status(500).json({error: "An error occured while fetching books"});
  }
});



// add book now

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
})

const upload = multer({ storage: storage })


// Set up a POST route to upload video data
app.post('/api/videos', upload.fields([{ name: 'img' }, { name: 'video' }]), async (req, res) => {
  try {
    const { userName, title, desc } = req.body;
    const imgUrl = req.files['img'] ? req.files['img'][0].path : ''; // Assuming you store the file path
    const videoUrl = req.files['video'] ? req.files['video'][0].path : ''; // Assuming you store the file path

    // Create a new video document
    const newVideo = new Video({
      userName,
      title,
      desc,
      imgUrl,
      videoUrl,
      likes: [],
      dislikes: [],
    });
    console.log(newVideo);
    // Save the video to the database
    await newVideo.save();

    // Respond with success message
    res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Error uploading video', error });
  }
});



app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;
    const filter = {}
    if(category) {
      filter.category = category;
    }
    const data = await Book.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({error: "An error occured while fetching books"});
  }
})
app.post("/api/posts", upload.single("thumbnail")  ,async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const newPost = new Post({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      thumbnail: req.file.filename,
      username: req.body.username,
    })
    console.log(newPost );
    await Post.create(newPost);
    res.json("Data Submitted");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
    console.log(error);
  }
});

app.post("/api/books", upload.single("thumbnail")  ,async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const newBook = new Book({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.file.filename,
      username: req.body.username,
      solution:req.body.solution,
      input:req.body.input,
      output:req.body.output,
    })

    await Book.create(newBook);
    res.json("Data Submitted");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});


app.put("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {

    const bookId = req.body.bookId;

    const updateBook = {
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
      username: req.body.username,
    }

    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }

    await Book.findByIdAndUpdate(bookId, updateBook)
    res.json("Data Submitted");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});


app.delete("/api/books/:id", async(req,res) => {
  const bookId = req.params.id;

  try {
    await Book.deleteOne({_id: bookId});
    res.json("How dare you!" + req.body.bookId);
  } catch (error) {
    res.json(error);
  }
});





// TRIAL


app.get("/", (req, res) => {
    res.json("This is the home page.");
});

app.get("*", (req, res) => {
    res.sendStatus("404");
});

app.listen(PORT, () => {
    console.log(`Sever running at Port: ${PORT}`)
});