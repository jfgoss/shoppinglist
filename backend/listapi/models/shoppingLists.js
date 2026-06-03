import { executeCommand } from "../dataaccess/database.js"

// TODO: Not the most efficient way to update by deleting all listItem records and reinserting
export const setShoppingListItems = async (shopperId, listId, listItems) => {
  // TODO: Error handling
  let insertCommands = [{ sql: "START TRANSACTION" }]
  if (listId) {
    const ownerCheckCommand = "SELECT list.id\
      FROM list\
      LEFT JOIN shopper ON list.owner_id = shopper.id\
      WHERE list.id = ? AND shopper.id = ? LIMIT 1;"
    const ownerCheckParams = [listId, shopperId]
    const res = await executeCommand([{ sql: ownerCheckCommand, parameters: ownerCheckParams}])
    if (!res[0][0].id) {
      return 0
    }

    const deleteCommand = "DELETE FROM listItem WHERE list_id=?"
    const deleteParams = [listId]
    insertCommands.push({ sql: deleteCommand, parameters: deleteParams })
  }

  insertCommands = insertCommands.concat(listItems.map((listItem) => { return {
      sql: "INSERT INTO listItem\
        (position, title, price, list_id)\
        VALUES (?, ?, ?, ?)",
      parameters: [listItem.order, listItem.title, listItem.price, listId]
    }
  }))

  insertCommands.push({ sql: "COMMIT" })

  await executeCommand(insertCommands)

  return listId
}

export const getShoppingListItems = async (shopperId, listId) => {
  // TODO: Error handling

  // Check list is owned by shopper
  const resOwner = await executeCommand([{ sql: "SELECT id FROM list WHERE list.id=? AND owner_id=?", parameters: [listId, shopperId] }])
  if (resOwner[0].length == 0) {
    return
  }

  // Keep shopperId in lookup to prevent different owners getting wrong list
  const command = "SELECT listItem.position as 'order', CAST(listItem.price AS FLOAT) as price, listItem.title\
    FROM listItem\
    INNER JOIN list ON listItem.list_id=list.id\
    WHERE list.id=? AND list.owner_id=?;"
  const parameters = [listId, shopperId]

  const res = await executeCommand([{ sql: command, parameters: parameters }])
  return res[0]
}

export const getShoppingLists = async (shopperId) => {
  // TODO: Error handling
  const res = await executeCommand([{ sql: "SELECT id, list_name FROM list WHERE owner_id=?", parameters: [shopperId] }])
  return res[0]
}
