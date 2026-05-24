const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const http = require("http");
const testRoute = require("./routes/testRoute");

const server = http.createServer((req, res) => {

  
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    if (testRoute(req, res)) return;

 
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});