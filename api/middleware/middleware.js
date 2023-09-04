// add general middlewares here
function logger(req, res, next) {
  const reqMethod = req.method
  const reqUrl = req.originalUrl
  const reqTimestamp = new Date().toLocaleString()
  console.log(`${reqMethod}, ${reqUrl}, ${reqTimestamp}`)
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
}