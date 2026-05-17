const express = require("express");
const app = express();
const cors = require("cors")

const { getToken } = require("./middleware/auth")
const { getList } = require("./middleware/lists")

app.use(express.json())
app.use(cors())

app.get("/status", (req, res) => {
  console.log(`/status request from ${req.hostname}`)
  res.status(200).json({
    message: 'listapi server running',
    timestamp: new Date().toISOString()
  });
});

app.post("/login", (req, res) => {
  console.log(`/login request from ${req.hostname}`)
  getToken(req, res)
})

app.get("/list/:listId", (req, res) => {
  console.log(`/list request from ${req.hostname}`)
  getList(req, res)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));