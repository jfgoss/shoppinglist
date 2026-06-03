import { executeCommand } from "../dataaccess/database.js"

export const getShopper = async (username) => {
  // TODO: Error handling
  const res = await executeCommand([{ sql: "SELECT id, username FROM shopper WHERE username=? LIMIT 1", parameters: [username] }])
  return res[0][0]
}
