// Write your "actions" router here!
const express = require('express');

// The middleware functions also need to be required
const { validateProjectId, validateProject } = require("./projects-middleware")

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