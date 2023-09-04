// Write your "actions" router here!
const express = require('express');

// The middleware functions also need to be required
const { validateActionId, validateAction, validateActionPut } = require("./actions-middlware")

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

router.get('/:id', validateActionId, (req, res) => {
  res.json(req.action)
});

router.post('/', validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(next)
});

router.put('/:id', validateActionId, validateActionPut, (req, res, next) => {
  const { name, description, project_id, completed } = req.body
  Action.update(req.params.id, { name: name, description: description, completed: completed, project_id: project_id })
    .then(() => { return Action.get(req.params.id) })
    .then(action => {
      res.json(action)
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