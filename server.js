const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const profileRouter = require("./routes/AllprofileRoutes");
const specificUser = require("./routes/specificUser");
const analyzeProfile = require("./routes/analyzeProfile")
const connectDataBase = mysql2.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "github_analyzer",
    password: "Comrade1989@",
    port: 3306
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