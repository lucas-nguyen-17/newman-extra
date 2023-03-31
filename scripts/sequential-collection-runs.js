const util = require("./util.js");
const fs = require("fs");
const path = require("path");

//Read all collections
const collections = fs.readdirSync(util.colFolder);

//Set postman environment
const env = path.join(util.envFolder, "Dev.postman_environment.json");

//Run each collection
collections.forEach((f) => {
    util.runNewman(path.join(util.colFolder, f), env);
});
