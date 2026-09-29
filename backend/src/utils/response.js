export const success = (res, data = null, message = 'Success', status = 200, extra = {}) =>
  res.status(status).json({ success: true, message, data, ...extra })

export const fail = (res, message = 'Something went wrong', status = 500) =>
  res.status(status).json({ success: false, message })