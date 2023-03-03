import {Router} from "express";
import {IFeatureToggleService} from "../services/feature-toggle-service";

export const FeatureToggleRoute = (
  featureToggleService: IFeatureToggleService
) =>
  Router()
    .get("/", (req, res) => {
      res.status(200).send({
        CH1025: false
      })
    })
    .post("/", async (req, res) => {
      await featureToggleService.setFeatureToggle(req.body)
      res.status(200).send({
        versionId: "abc"
      })
    })