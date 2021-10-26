require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRouter = require('./routes/auth.router');

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

connectDB()

app.use(express.json());
app.use('/api/auth', authRouter);

const port = 5000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))