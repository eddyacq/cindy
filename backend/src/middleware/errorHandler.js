export const notFound = (req, res) =>
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` })

export const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ success: false, message: 'Already exists' })
  }

  const status = err.status || 500
  res.status(status).json({
    success: false,
    message: status === 500 ? 'Internal server error' : err.message,
  })
}