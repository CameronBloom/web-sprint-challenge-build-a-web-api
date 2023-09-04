// Write your "actions" router here!
const express = require('express');

// The middleware functions also need to be required
const { validateActionId } = require("./actions-middlware")

// The middleware functions also need to be required
const Action = require("../actions/actions-model")

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Action.get()
    .then(actions => {
      if (!actions) {
        res.json([])
      } else {
        res.json(actions)
      }
      
    })
    .catch(next)
});

router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id)
    res.json(req.project)
  } catch(err) {
    next(err)
  }
});

// do not forget to export the router
module.exports = router