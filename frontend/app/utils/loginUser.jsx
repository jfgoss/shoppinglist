import axios from "axios"
import { getListApiUrl } from "./config"

let sessionToken = ""

export const getSessionToken = () => {
  return sessionToken
}

export const loginUser = (username, setSessionToken, setErrorMessage) => {
  sessionToken = ""
  const headers = {
    "Content-Type": "application/json"
  }

  const url = `${getListApiUrl()}/login`
  axios.post(url, { username: username }, { headers: headers })
  .then(response => {
    sessionToken = response.data.token
    setSessionToken(sessionToken)
  })
  .catch((error) => {
    console.error("Failed to get login")
    console.error(error)

    setErrorMessage("An error occurred during sign in. Please try again.")
    setSessionToken(sessionToken)
  })
}