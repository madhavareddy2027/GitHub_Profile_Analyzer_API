const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const profileRouter = require("./routes/AllprofileRoutes");
const specificUser = require("./routes/specificUser");
const analyzeProfile = require("./routes/analyzeProfile")
const connectDataBase = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}).promise();

app.locals.connectDataBase = connectDataBase;

//GET ALL DATA API
app.use("/", profileRouter);
// GET SPECIFIC USER
app.use("/",specificUser);
//CREATE OR ANALYZE
app.use("/",analyzeProfile)
app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});