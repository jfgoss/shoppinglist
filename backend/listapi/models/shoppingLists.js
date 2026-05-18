const list1 = [
    {
      price: 1.23,
      title: "cheese",
      order: 3
    },
    {
      price: 2.31,
      title: "milk 4pt",
      order: 0
    },
    {
      price: 1.50,
      title: "porridge",
      order: 2
    },
    {
      price: 2,
      title: "apples",
      order: 1
    },
  ]

const lists = [
  {
    shopperId: 1,
    listId: 1,
    items: list1
  }
]

const getShoppingList = (shopperId, listId) => {
  return lists.find(list =>
    list.shopperId == shopperId &&
    list.listId == listId
  )
}

module.exports = {
  getShoppingList
}