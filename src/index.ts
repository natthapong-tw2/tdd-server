import express from "express"

const app = express()
app
  .get("/health-check", (req, res) => {
    res.status(200).send({})
  })

app
  .get("/users", (req, res) => {
    res.status(200).send([])
  })

app
  .get("/shops", (req, res) => {
    res.status(200).send([])
  })

app
  .post("/financial-planner", (req, res) => {
    const authorization = req.header("authorization")
    if(authorization === "abc") {
      res.status(200).send([])
    } else {
      res.status(404).send([])
    }
  })

app.listen(8080, () => {
  console.log("server started at http://localhost:8080")
})