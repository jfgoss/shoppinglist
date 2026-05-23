import React from "react"
import { ListItem } from "./ListItem"

export const ShoppingList = ({list, setList}) => {
  const onDelete = (order) => {
    const index = list.indexOf(list.find(item => item.order == order))
    console.log(index)
    setList(list.toSpliced(index, 1))
  }

  return (
    <>
      {
        list
          .toSorted((a,b) => (a.order - b.order) )
          .map(listItem => <ListItem key={listItem.order} listItem={listItem} onDelete={onDelete}/>)
      }
    </>
  )
}