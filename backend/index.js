const express = require("express");
const webapp = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const path = require("path");
webapp.use(express.json());

webapp.set("view engine", "ejs");
webapp.use(express.urlencoded({ extended: false }));



const userRoute = require("./routes/userRoute");
const songsRoute = require("./routes/songsRoute");
const manageRoute = require("./routes/manageRoute");

webapp.use("/api/users", userRoute);
webapp.use("/api/songs", songsRoute);
webapp.use("/api/manage", manageRoute);

const port = process.env.PORT || 5000;

webapp.get('/', (req, res) => {
    res.send('Ohiyo Sakai')
});

webapp.listen(port, () => console.log(`Listening on http://localhost:${port}!`));
