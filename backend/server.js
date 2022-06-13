const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');
//*  .config allows us to have a .env file where can store our envars.
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
//* runs on the env var port or 8080 if that env var doesn't exist.
const port = process.env.PORT || 8080;

connectDB()

const app = express();

// Express middleware.
app.use(cors());
// Allows us to parse request body.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// All requests going to this route get forwarded to goalRoutes file.
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//overwrites default express errorHandler for request response cycle.
app.use(errorHandler);

app.listen(port, (e) => {
  console.log(`Server is running on port ${port}`)
});