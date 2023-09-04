const Project = require("../projects/projects-model")

// interacting with DB? use async
async function validateProjectId(req, res, next) {

  try {
    const projectLookup = await Project.get(req.params.id)
    if (!projectLookup) {
      res.status(404).json({
        message: "project not found"
      })
    } else {
      req.project = projectLookup
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: "error encountered when validating project ID"
    })
  }
}

function validateProject(req, res, next) {

  const { name, description } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({
      message: "missing required name field"
    })
   } else if (!description || !description.trim()) {
    res.status(400).json({
      message: "missing required description field"
    })
  } else {
    req.name = name.trim()
    req.description = description.trim()
    next()
  }
}

function validatePut(req, res, next) {
  console.log(`validating put...`)
  console.log(req.body)
  const { name, description, completed } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({
      message: "missing required name field"
    })
   } else if (!description || !description.trim()) {
    res.status(400).json({
      message: "missing required description field"
    })
  } else if (completed !== false && completed !== true) {
    res.status(400).json({
      message: "missing required completed field"
    })
  } else {
    req.name = name.trim()
    req.description = description.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  validateProjectId,
  validateProject,
  validatePut,
}