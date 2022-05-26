const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const apiRoutes = require("./src/modules/routes/userRoutes");

app.use(cors());

const uri = process.env.URI;
mongoose.connect(uri);

app.use(express.json());
app.use("/", apiRoutes);

app.listen(5000, () => console.log("Server running on 5000 port"));