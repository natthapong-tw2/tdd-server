import express from "express"
import { handleToggle } from "./utils/handle-toggle"
import { FeatureToggleRoute } from "./routes/feature-toggle-route"
import { FeatureToggleService } from "./services/feature-toggle-service"
import { FrequencyRepository } from "./repository/frequency-repository"
import { getFrequency } from "./services/deployment-frequency"

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
  .post("/financial-planner", handleToggle, (req, res) => {
    res.status(200).send([])
  })
  .use("/feature-toggle", FeatureToggleRoute(FeatureToggleService()))
  .get("/deployment-frequency", (req, res) => {
    const { period } = req.query
    const frequencyRepository = FrequencyRepository()
    const { times, period: calculatedPeriod } = getFrequency(
      frequencyRepository,
      period
    )
    res.status(200).send({
      frequency: `${times} times a ${calculatedPeriod}`,
      project: "",
    })
  })
  .listen(8080, () => {
    console.log("server started at http://localhost:8080")
  })
