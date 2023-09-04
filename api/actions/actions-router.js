// Write your "actions" router here!
const express = require('express');

// The middleware functions also need to be required
const {} = require("./actions-middlware")

// The middleware functions also need to be required
const Action = require("../actions/actions-model")

const router = express.Router();

// do not forget to export the router
module.exports = router