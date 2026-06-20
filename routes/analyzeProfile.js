const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/analyze/:username", async (req, res) => {
    try {
        const { username } = req.params;

        // Fetch data from GitHub API
        const response = await axios.get(
            `https://api.github.com/users/${username}`
        );

        const data = response.data;

        // Insert data into MySQL
        const insertQuery = `
            INSERT INTO profiles
            (username, name, bio, public_repos, followers, following, avatar_url, profile_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await req.app.locals.connectDataBase.execute(insertQuery, [
            data.login,
            data.name,
            data.bio,
            data.public_repos,
            data.followers,
            data.following,
            data.avatar_url,
            data.html_url
        ]);

        res.status(201).json({
            message: "GitHub profile analyzed and saved successfully",
            username: data.login
        });

    } catch (error) {
        console.log(error.message);
        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                message: "GitHub user not found"
            });
        }

    }
});

module.exports = router;