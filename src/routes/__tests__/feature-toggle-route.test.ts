import express from "express";
import supertest from "supertest";
import {FeatureToggleRoute} from "../feature-toggle-route";
import {describe, it, expect, vi, beforeEach} from "vitest";

describe("FeatureToggleRoute", () => {
  const featureToggleService = {
    setFeatureToggle: vi.fn()
  }
  const featureToggleRoute = FeatureToggleRoute(featureToggleService)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("POST /", () => {
    it("should call service correctly", async () => {
      const router = express()
        .use(express.json())
        .use("", featureToggleRoute);
      const featureToggle = {
        CH1025: true
      };
      const actual = await supertest(router)
        .post("/")
        .send(featureToggle)

      expect(actual.status).toEqual(200)
      expect(featureToggleService.setFeatureToggle)
        .toHaveBeenCalledWith(featureToggle)
    })
  })
})