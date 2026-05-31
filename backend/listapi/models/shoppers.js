const { executeCommand } = require('../dataaccess/database')

const getShopper = async (username) => {
  // TODO: Error handling
  const res = await executeCommand([{ sql: "SELECT id, username FROM shopper WHERE username=? LIMIT 1", parameters: [username] }])
  return res[0][0]
}

module.exports = {
  getShopper
}