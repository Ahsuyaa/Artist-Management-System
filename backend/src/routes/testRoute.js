const testController = require("../controllers/testController");

function testRoute(req, res) {
    if (req.url === "/api/test" && req.method === "GET") {
        testController(req, res); 
        return true;            
    }

    return false;
}

module.exports = testRoute;