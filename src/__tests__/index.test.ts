import supertest from "supertest"
import { describe, it, expect } from "vitest"

describe("index", () => {
  const app = supertest("http://localhost:8080")

  describe("GET /health-check", () => {
    it("should return 200", async () => {
      const actual = await app.get("/health-check")

      expect(actual.status).toEqual(200)
    })
  })

  describe("GET /users", () => {
    it("should return 200", async () => {
      const actual = await app.get("/users")

      expect(actual.status).toEqual(200)
    })

    it("should return list of users", async () => {
      const actual = await app.get("/users")

      expect(actual.body).toEqual([])
    })
  })

  describe("GET /shops", () => {
    it("should return status code as 200", async () => {
      const actual = await app.get("/shops")

      expect(actual.status).toEqual(200)
    })
  })

  describe("POST /financial-planner", () => {
    it("should return not found when not have access", async () => {
      const actual = await app.post("/financial-planner")

      expect(actual.status).toEqual(404)
    })

    it("should return 200 when it contains authorization header", async () => {
      const actual = await app
        .post("/financial-planner")
        .set({ Authorization: "abc" })

      expect(actual.status).toEqual(200)
    })
  })

  describe("GET /feature-toggle", () => {
    it("should return expected response", async () => {
      const actual = await app.get("/feature-toggle")

      expect(actual.status).toEqual(200)
      expect(actual.body).toEqual({
        CH1025: false,
      })
    })
  })

  describe("POST /feature-toggle", () => {
    it("should return id of current version", async () => {
      const actual = await app
        .post("/feature-toggle")
        .set({ Authorization: "userId" })
        .send({
          CH1025: false,
        })

      expect(actual.status).toEqual(200)
      expect(actual.body).toEqual({
        versionId: "abc",
      })
    })
  })

  describe("POST /deployments", () => {})

  describe("GET /deployment-frequency", () => {
    it("should return 200", async () => {
      const actual = await app.get("/deployment-frequency")

      expect(actual.status).toEqual(200)
    })
  })
})
