const Action = require("../actions/actions-model")

async function validateActionId(req, res, next) {

  try {
    const actionLookup = await Action.get(req.params.id)
    if (!actionLookup) {
      res.status(404).json({
        message: "action not found"
      })
    } else {
      req.action = actionLookup
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: "error encountered when validating project ID"
    })
  }
}

function validateAction(req, res, next) {

  const { notes, description, project_id } = req.body
  if (!notes || !notes.trim()) {
    res.status(400).json({
      message: "missing required notes field"
    })
   } else if (!description || !description.trim()) {
    res.status(400).json({
      message: "missing required description field"
    })
  } else if (!project_id) {
    res.status(400).json({
      message: "missing required project_id field"
    })
  } else {
    req.notes = notes.trim()
    req.description = description.trim()
    next()
  }
}

function validateActionPut(req, res, next) {

  const { notes, description, project_id, completed } = req.body
  if (!notes || !notes.trim()) {
    res.status(400).json({
      message: "missing required notes field"
    })
   } else if (!description || !description.trim()) {
    res.status(400).json({
      message: "missing required description field"
    })
  } else if (!project_id) {
    res.status(400).json({
      message: "missing required project_id field"
    })
  } else if (completed !== false && completed !== true) {
    res.status(400).json({
      message: "missing required completed field"
    })
  } else {
    req.notes = notes.trim()
    req.description = description.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  validateActionId,
  validateAction,
  validateActionPut,
}