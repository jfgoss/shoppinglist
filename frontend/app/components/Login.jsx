import React from "react"
import { loginUser } from "../utils/loginUser"

export const Login = ({setSessionToken, setErrorMessage}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    loginUser(Object.fromEntries(formData).username, setSessionToken, setErrorMessage)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username: <input name="username" />
      </label>
      <p />
      <button type="submit">Login</button>
    </form>
  )
}