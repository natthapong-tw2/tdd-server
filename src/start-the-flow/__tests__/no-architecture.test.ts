import { describe, expect, it } from "vitest"
import express from "express"
import supertest from "supertest"
import { UserRoute } from "../UserRoute"

describe("Get users", () => {
  const app = express().use(express.json()).use("/api/v1/users", UserRoute())

  it("should return 200", async () => {
    const response = await supertest(app).get("/api/v1/users")

    expect(response.status).toEqual(200)
  })
})
