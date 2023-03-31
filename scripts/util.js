const newman = require("newman");
const moment = require("moment-timezone");
const path = require("path");

const runNewman = function (file, env) {
    const date_time = moment()
        .tz("Asia/Ho_Chi_Minh")
        .format("DD-MM-YYYY_HH-mm-ss");
    const collection_name = path
        .basename(file)
        .replace(".postman_collection.json", "")
        .replace(" ", "-")
        .toLowerCase();
    const fileName = `report-${collection_name}-${date_time}`;
    
    newman.run(
        {
            collection: require(file),
            environment: env,
            reporters: ["cli", "htmlextra"],
            reporter: {
                htmlextra: {
                    export: `./report/${fileName}.html`
                }
            }
        },
        (err, summary) => {
            if (err) throw err;
            // console.log(summary.run.failures);
        }
    );
};

const colFolder = path.join(__dirname, "..", "collections");
const envFolder = path.join(__dirname, "..", "env");

module.exports = { runNewman, colFolder, envFolder };
