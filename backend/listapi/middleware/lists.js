const { authorise } = require("./auth")
const { setShoppingListItems, getShoppingListItems, getShoppingLists } = require("../models/shoppingLists")
const { getShopper } = require("../models/shoppers")

const setList = async (req, res) => {
  try {
    const username = await authorise(req, res)
    if (!username) {
      // authorise will have already res.send(401)
      return
    }

    const shopper = await getShopper(username)
    // Authorised user does not match any known shoppers
    if (!shopper) {
      res.status(403).send()
      return
    }
    if (!req.body?.listId || !Array.isArray(req.body?.list)) {
      res.status(400).send()
      return
    }

    const list = await setShoppingListItems(shopper.id, req.body.listId, req.body.list)
    if (!list) {
      res.status(404).send()
      return
    }

    res.status(200).send()
  } catch (err) {
    console.error(`Error setting list: ${err}`)

    // Don't return err.message as this can contain internal details of
    // the system that can be exploited by bad actors
    res.status(500).send()
  }
}

const getList = async (req, res) => {
  try {
    const username = await authorise(req, res)
    if (!username) {
      // authorise will have already res.send(401)
      return
    }

    const shopper = await getShopper(username)
    // Authorised user does not match any known shoppers
    if (!shopper) {
      res.status(403).send()
      return
    }

    const listItems = await getShoppingListItems(shopper.id, req.params.listId)
    if (!listItems) {
      res.status(404).send()
      return
    }

    res.status(200).json(listItems)
  } catch (err) {
    console.error(`Error getting list: ${err}`)

    // Don't return err.message as this can contain internal details of
    // the system that can be exploited by bad actors
    res.status(500).send()
  }
}

module.exports = {
  setList,
  getList
}