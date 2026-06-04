import { getUserFromToken, createUserToken } from "../models/authUsers.js"

// TODO: This is just to track different users between api calls using a token
//       full authorisation will be implemented in #10
export const authorise = async (req, res) => {
  const userToken = req?.headers?.authorization
  const username = getUserFromToken(userToken)
  if (!username) {
    // No matching user found
    res.status(401).json({ message: "Unauthorised" })
    return
  }

  return username
}

export const getToken = async (req, res) => {
  try {
    const username = req?.body?.username
    if (!username) {
      res.status(400).send()
      return
    }

    // TODO: As part of story #10 we can implement a username/password login with other auth (e.g. JWT)
    const token = await createUserToken(username)

    // We return 401, not 404 as we don't want to notify attackers that
    // a username is known or not
    if (!token) {
      res.status(401).send()
      return
    }

    res.status(200).json({ token: token })
  } catch (err) {
    console.error(`Error getting list: ${err}`)

    // Don't return err.message as this can contain internal details of
    // the system that can be exploited by bad actors
    res.status(500).send()
  }
}
