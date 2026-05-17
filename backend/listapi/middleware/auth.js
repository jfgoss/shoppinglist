const { getUserAuth } = require("../models/authUsers")

// TODO: This is just to track different users between api calls using a token
//       full authorisation will be implemented in #10
const authorise = (req, res) => {
  const userToken = req?.headers?.authorization?.toLowerCase()
  const auth = getUserAuth().find(user => user.token?.toLowerCase() == userToken)

  if (!auth) {
    res.status(401).json({ message: "Unauthorised" })
  }

  return auth?.username
}

const getToken = (req, res) => {
  try {
    const username = req?.body?.username?.toLowerCase()
    if (!username) {
      res.status(400).send()
      return
    }

    // TODO: As part of story #10 we can implement a username/password login with other auth (e.g. JWT)
    const auth = getUserAuth().find(user => user?.username.toLowerCase() == username)

    // We return 401, not 404 as we don't want to notify attackers that
    // a username is known or not
    if (!auth) {
      res.status(401).send()
      return
    }

    res.status(200).json({ token: auth.token })
  } catch (err) {
    console.error(`Error getting list: ${err}`)

    // Don't return err.message as this can contain internal details of
    // the system that can be exploited by bad actors
    res.status(500).send()
  }
}

module.exports = {
  authorise,
  getToken
}