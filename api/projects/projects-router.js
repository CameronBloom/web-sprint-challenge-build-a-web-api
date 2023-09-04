// Write your "actions" router here!
const express = require('express');

// The middleware functions also need to be required
const { validateProjectId, validateProject, validatePut } = require("./projects-middleware")

// The middleware functions also need to be required
const Project = require("../projects/projects-model")

const router = express.Router();



router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Project.get()
    .then(projects => {
      if (!projects) {
        res.json([])
      } else {
        res.json(projects)
      }
      
    })
    .catch(next)
});

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project)
});


router.post('/', validateProject, (req, res, next) => {
  Project.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(next)
});


router.put('/:id', validateProjectId, validatePut, (req, res, next) => {
  const { name, description, completed } = req.body
  Project.update(req.params.id, { name: name, description: description, completed: completed })
    .then(() => { return Project.get(req.params.id) })
    .then(project => {
      res.json(project)
    })
    .catch(next)
});


router.delete('/:id', validateProjectId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    await Project.remove(req.params.id)
    res.json(req.project)
  } catch(err) {
    next(err)
  }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const projectActions = await Project.getProjectActions(req.params.id)
    res.json(projectActions)
  } catch(err) {
    next(err)
}});


// error handling
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
    alert: "error handler has identified an issue"
  })
})

// do not forget to export the router
module.exports = router