const express = require("express");
const router = express.Router();

router.get("/profiles", async (req, res) => {
    try {
        const getAllDetails = "SELECT * FROM profiles";

        const [result] = await req.app.locals.connectDataBase.execute(getAllDetails);

        res.send(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;