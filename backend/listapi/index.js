const express = require("express")
const app = express()
const cors = require("cors")
const rateLimit = require("express-rate-limit");

const { initDbConnection, closeDbConnection } = require("./dataaccess/database")
//const { executeCommand } = require("./dataaccess/database")

const { getToken } = require("./middleware/auth")
const { getList, setList } = require("./middleware/lists")

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
})

app.use(express.json())
app.use(cors())
app.use(limiter)

initDbConnection()

// This is just to test the MariaDB lib if required.
// Import executeCommand from ./dataaccess/database to use.
/*
const testDatabase = async (commands) => {
  const testQueryResults = await executeCommand(commands)
  testQueryResults.forEach((res) => console.log(res))
}
testDatabase([{ sql: "SELECT * FROM shopper;" }, { sql: "SELECT * FROM list;" }, {sql: "SELECT * FROM listItem WHERE list_id=?;", parameters: [1] }])
*/

app.get("/status", (req, res) => {
  console.log(`GET /status request from ${req.hostname}`)
  res.status(200).json({
    message: 'listapi server running',
    timestamp: new Date().toISOString()
  });
});

app.post("/login", (req, res) => {
  console.log(`POST /login request from ${req.hostname}`)
  getToken(req, res)
})

app.get("/list/:listId", (req, res) => {
  console.log(`GET /list request from ${req.hostname}`)
  getList(req, res)
})

app.post("/list", (req, res) => {
  console.log(`POST /list request from ${req.hostname}`)
  setList(req, res)
})

const PORT = process.env.SHOPPING_LIST_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// TODO: We should close the DB connection pool when the server closes
//closeDbConnection()
