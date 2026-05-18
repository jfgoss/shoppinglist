import { ShoppingList } from "../components/ShoppingList"
import { Login } from "../components/Login"
import { ErrorMessage } from "../components/ErrorMessage"
import { getList } from "../utils/listApi"
import { getSessionToken } from "../utils/loginUser"

import { useEffect, useState } from "react"

export function meta() {
  return [
    { title: "shopping list" },
    { name: "description", content: "Manage your shopping list" },
  ];
}

export default function Home() {
  const [errorMessage, setErrorMessage] = useState("")
  const [currentList, setCurrentList] = useState(undefined)
  const [sessionToken, setSessionToken] = useState("")

  useEffect(() => {
    if (sessionToken) {
      // Fix the list we're requesting for now
      getList(1, setCurrentList, setErrorMessage)
    }
  }, [sessionToken])

  return (
    <>
      {errorMessage ?? (
        <ErrorMessage message={errorMessage} />
      )}
      {!sessionToken ? (
        <Login setSessionToken={setSessionToken} setErrorMessage={setErrorMessage} />
      ) : currentList ? (
        <ShoppingList list={currentList} />
      ) : (
        <div>No shopping list available.</div>
      )}
    </>
  )
}
