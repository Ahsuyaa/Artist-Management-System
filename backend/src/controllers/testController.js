const fs = require("fs");
const path = require("path");

function getArtists(req, res) {
    // This looks for 'backend/src/data/artist.json'
    const filePath = path.resolve(__dirname, "..", "data", "artist.json");
    
    console.log("Looking for file at:", filePath); // Check your terminal for this output!

    fs.readFile(filePath, "utf-8", (err, fileData) => {
        if (err) {
            console.error("System Error details:", err.code, "-", err.message);

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                error: "Failed to read artists data",
                debugMessage: err.message // Temporary: This will tell you exactly why it failed
            }));
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(fileData);
    });
}

module.exports = getArtists;