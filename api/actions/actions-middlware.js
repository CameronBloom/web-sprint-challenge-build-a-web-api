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

// do not forget to expose these functions to other modules
module.exports = {
  validateActionId,
}