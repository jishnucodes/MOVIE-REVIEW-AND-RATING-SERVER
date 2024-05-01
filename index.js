const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const dbConnection = require('./Config/dbConfig');
const { cloudinary } = require('./Config/cloudinaryConfig');

const routes = require('./routes/index');


//connecting the database
dbConnection();

//port
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})