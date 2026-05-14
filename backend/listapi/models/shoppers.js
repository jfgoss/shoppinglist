const shoppers = [
  {
    id:1,
    username: "user1",
  },
  {
    id:2,
    username: "user2",
  },
]

const getShopper = (username) => {
  return shoppers.find(shopper => shopper.username == username)
}

module.exports = {
  getShopper
}