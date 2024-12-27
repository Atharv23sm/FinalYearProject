const express = require('express');
const cors = require('cors');
require('dotenv').config()
// const path = require('path')
require("./conn/conn");

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);
const createTestRoutes = require('./routes/createTestRoutes');
app.use('/', createTestRoutes);
const testRoutes = require('./routes/testRoutes');
app.use('/', testRoutes);

app.listen(process.env.PORT , () => console.log(`Server is running`+process.env.PORT));
