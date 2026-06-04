import { ListItem } from "./ListItem"

export const ShoppingList = ({list, setList}) => {
  const onDelete = (order) => {
    const index = list.indexOf(list.find(item => item.order == order))    
    const modifiedList = list.toSpliced(index, 1)
    setList(modifiedList)
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