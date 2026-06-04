const crypto = require('crypto')

const { executeCommand } = require('../dataaccess/database')

// TODO: This is no longer really a model, but will move when we implement full user auth #10
//       as it is currently dependent on shopper db table to get list of usernames

let userAuth

const getUserFromToken = (token) => {
  // Prevent getting a user who is not logged in with null
  if (token) {
    const user = userAuth?.find((user) => user.token == token)
    if (user) {
      return user.username
    }
  }
}

const createUserToken = async (username) => {
  if (!userAuth) {
    // TODO: Error handling
    const res = await executeCommand([{ sql: "SELECT username, null as token FROM shopper;" }])
    userAuth = res[0]
  }
  const user = userAuth.find((user) => user.username.toLowerCase() == username.toLowerCase())
  if (user) {
    const token = crypto.randomUUID()
    user.token = token
    return token
  }
}

module.exports = {
  getUserFromToken,
  createUserToken
}