const Project = require("../projects/projects-model")

// function validateProjects(req, res, next) {
//   // DO YOUR MAGIC
//   const { text } = req.body
//   if (!text || !text.trim()) {
//     res.status(400).json({
//       message: "missing required text field"
//     })
//   } else {
//     req.text = text.trim()
//     next()
//   }
// }

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

// do not forget to expose these functions to other modules
module.exports = {
  validateProjectId,
}