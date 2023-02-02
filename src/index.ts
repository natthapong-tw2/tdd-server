import express from "express"

const app = express()
app
  .get("/health-check", (req, res) => {
    res.status(200).send({})
  })
  .get("/users", (req, res) => {
    res.status(200).send([])
  })
  .get("/shops", (req, res) => {
    res.status(200).send([])
  })

app.listen(8080, () => {
  console.log("server started at http://localhost:8080")
})