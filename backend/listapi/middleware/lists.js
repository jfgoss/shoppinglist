const auth = require("./auth")
const shoppingLists = require("../models/shoppingLists")
const shoppers = require("../models/shoppers")

const getList = (req, res) => {
  try {
    const username = auth.authorise(req, res)
    if (!username) {
      // authorise will have already res.send(401)
      return
    }

    const shopper = shoppers.getShopper(username)
    // Authorised user does not match any known shoppers
    if (!shopper) {
      res.status(403).send()
    }

    const list = shoppingLists.getShoppingList(shopper.id, req.params.listId)
    if (!list) {
      res.status(404).send()
    }
    res.status(200).json(list.items)
  } catch (err) {
    console.error(`Error getting list: ${err}`)

    // Don't return err.message as this can contain internal details of
    // the system that can be exploited by bad actors
    res.status(500)
  }
}

module.exports = {
  getList
}