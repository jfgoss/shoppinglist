import axios from "axios"
import { getListApiUrl } from "./config"
import { getSessionToken } from "./loginUser"

export const getList = async (listId, setList, setErrorMessage) => {
  const sessionToken = getSessionToken()
  if (!sessionToken) {
    console.error("No user session")
    setErrorMessage("No user session, please sign in")
    return
  }

  const headers = {
    authorization: sessionToken
  }

  let list
  const url = `${getListApiUrl()}/list/${listId}`
  return axios.get(url, { headers: headers })
    .then(response => {
      setList(response.data)
    })
    .catch((error) => {
      console.error("Failed to get list")
      console.error(error)

      setErrorMessage("An error occurred getting the list")
    })
}