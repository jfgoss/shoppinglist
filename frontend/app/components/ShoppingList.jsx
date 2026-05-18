import { ListItem } from "./ListItem"

export const ShoppingList = ({list}) => {
  return (
    <>
      {
        list
          .toSorted((a,b) => (a.order - b.order) )
          .map(listItem => <ListItem key={listItem.order} listItem={listItem}/>)
      }
    </>
  )
}