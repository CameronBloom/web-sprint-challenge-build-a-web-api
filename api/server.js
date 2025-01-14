const express = require('express');
const { logger } = require("./middleware/middleware");
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")

// remember express by default cannot parse JSON in request bodies
server.use(express.json())

// global middlewares and the user's router need to be connected here
server.use(logger)
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;