const userAuth = [
  {
    username: "user1",
    token: "12345a"
  },
  {
    username: "user2",
    token: "12345b"
  }
]

// TODO: This is just to track different users between api calls using a token
//       full authorisation will be implemented in #10
const authorise = (req, res) => {
  const userToken = req?.headers?.authorization
  const auth = userAuth.find(user => user.token?.toLowerCase() == userToken)

  if (!auth) {
    res.status(401).json({ message: "Unauthorised" })
  }

  return auth?.username
}

const getToken = (req, res) => {
  const username = req?.body?.username?.toLowerCase()
  if (!username) {
    res.status(400).send()
    return
  }

  // TODO: As part of story #10 we can implement a username/password login with other auth (e.g. JWT)
  const auth = userAuth.find(user => user?.username.toLowerCase() == username)

  // We return 401, not 404 as we don't want to notify attackers that
  // a username is known or not
  if (!auth) {
    res.status(401).send()
    return
  }

  res.status(200).json({ token: auth.token })
}

module.exports = {
  authorise,
  getToken
}