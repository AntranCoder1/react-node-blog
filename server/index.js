require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer  = require('multer');
const path = require('path');

const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const postRouter = require('./routes/posts.router');
const categoryRouter = require('./routes/category.router');

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, "/images")));

const connectDB = async () => {
	try {
		await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blog.0gcwr.mongodb.net/Blog?retryWrites=true&w=majority`,
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		)
		
		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  	cb(null, 'images')
	},
	filename: function (req, file, cb) {
		cb(null, req.body.name);
	}
})
  
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single("file"), (req, res) => {
	res.status(200).json({ success: true, message: 'File has been uploaded' });
})

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/post', postRouter);
app.use('/api/category', categoryRouter);


const port = 5000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))