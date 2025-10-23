const http = require("http");
const fs = require("fs");

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
    if (req.url === "/" || req.url === "/index.html") {
        // Sert le HTML
        const index = fs.readFileSync("index.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(index);
    } else if (req.url === "/styles/style.css") {
        // Sert le CSS
        const css = fs.readFileSync("./styles/style.css");
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(css);
    } else {
        // Gère les fichiers inexistants
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
