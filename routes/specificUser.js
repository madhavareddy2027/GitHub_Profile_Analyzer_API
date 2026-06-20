const express = require("express");

const router = express.Router();

router.get("/user/:username", async (req, res) => {
    try {
        const { username } = req.params;

        const getUserSpecific = `SELECT * FROM profiles WHERE username = ?`;

        const [result] = await req.app.locals.connectDataBase.execute(
            getUserSpecific,
            [username]
        );

        if (result.length === 0) {
            return res.status(404).send("User not found");
        }

        res.send(result);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;