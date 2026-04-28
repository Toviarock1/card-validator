import app from "./server";
import http from "http";
import setupMiddleware from "./startup/middleware";
import setupRoutes from "./startup/routes";

setupMiddleware(app);
setupRoutes(app);

const port = 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
