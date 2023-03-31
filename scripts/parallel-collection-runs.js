var path = require("path");
const async = require("async");
const util = require("./util");
const fs = require("fs");

//Read all collections
const collections = fs.readdirSync(util.colFolder);

//Set postman environment
const env =  path.join(util.envFolder, "Dev.postman_environment.json");

//Create an array of tasks
const parallelCollectionRuns = [];
collections.forEach((f) => {
    parallelCollectionRuns.push(function (done) {
        util.runNewman(
            path.join(util.colFolder, path.basename(f)), env
        );
    });
});

//Run collections in parallel.
async.parallel(parallelCollectionRuns, function (err, results) {
    if (err) {
        console.error(err);
    }
});
