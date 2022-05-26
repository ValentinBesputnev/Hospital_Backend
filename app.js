const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config()

const userRoutes = require("./src/modules/routes/userRoutes");

app.use(cors());

const uri = process.env.URI;
mongoose.connect(uri);

app.use(express.json());
app.use("/", userRoutes);

app.listen(5000, () => console.log("Server running on 5000 port"));