import {Router} from "express";

export const featureToggleRoute =
  Router()
    .get("/", (req, res) => {
      res.status(200).send({
        CH1025: false
      })
    })
    .post("/", (req, res) => {
      res.status(200).send({
        versionId: "abc"
      })
    })