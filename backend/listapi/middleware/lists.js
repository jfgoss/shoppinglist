const { authorise } = require("./auth")
const { getShoppingList } = require("../models/shoppingLists")
const { getShopper } = require("../models/shoppers")

const getList = (req, res) => {
  try {
    const username = authorise(req, res)
    if (!username) {
      // authorise will have already res.send(401)
      return
    }

    const shopper = getShopper(username)
    // Authorised user does not match any known shoppers
    if (!shopper) {
      res.status(403).send()
      return
    }

    const list = getShoppingList(shopper.id, req.params.listId)
    if (!list) {
      res.status(404).send()
      return
    }
    res.status(200).json(list.items)
  } catch (err) {
    console.error(`Error getting list: ${err}`)

    // Don't return err.message as this can contain internal details of
    // the system that can be exploited by bad actors
    res.status(500).send()
  }
}

module.exports = {
  getList
}