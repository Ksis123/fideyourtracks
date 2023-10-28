const express = require("express");
const webapp = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const path = require("path");

webapp.use(express.json());
webapp.use(express.urlencoded({ extended: false }));

const userRoute = require("./routes/userRoute");
const tracksRoute = require("./routes/tracksRoute");
const manageRoute = require("./routes/manageRoute");

webapp.use("/api/users", userRoute);
webapp.use("/api/tracks", tracksRoute);
webapp.use("/api/manage", manageRoute);

const port = process.env.PORT || 5000;

webapp.get('/', (req, res) => {
    res.send('Ohiyo Sakai')
});

webapp.listen(port, () => console.log(`Listening on http://localhost:${port}!`));
