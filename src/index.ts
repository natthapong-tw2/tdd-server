import express from "express"
import {handleToggle} from "./utils/handle-toggle"
import {featureToggleRoute} from "./controllers/feature-toggle-route";

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
  .post("/financial-planner",
    handleToggle,
    (req, res) => {
      res.status(200).send([])
    }
  )
  .use("/feature-toggle", featureToggleRoute)
  .listen(8080, () => {
    console.log("server started at http://localhost:8080")
  })