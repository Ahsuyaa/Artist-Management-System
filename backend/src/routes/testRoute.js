const testController = require("../controllers/testController");

function testRoute(req, res) {

    if (req.url === "/api/test" && req.method === "GET") {
        return testController(req, res);
    }

    return false; // not handled
}

module.exports = testRoute;