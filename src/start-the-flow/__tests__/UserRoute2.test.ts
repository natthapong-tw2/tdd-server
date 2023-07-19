import { describe, expect, it, vi, beforeEach } from "vitest"
import express from "express"
import supertest from "supertest"
import { UserRoute } from "../UserRoute"

describe("User Route", () => {
  const userService = {
    getUsers: vi.fn(),
    createUser: vi.fn(),
  }
  const app = express()
    .use(express.json())
    .use("/api/v1/users", UserRoute(userService))

  describe("create users", () => {
    beforeEach(() => {
      vi.clearAllMocks()
      userService.createUser.mockReturnValue("userId")
    })

    it("should return status 201 when create user success", async () => {
      const response = await supertest(app).post("/api/v1/users").send({
        name: "John Smith",
      })

      expect(response.status).toEqual(201)
    })

    it("should return user id when create user success", async () => {
      const response = await supertest(app).post("/api/v1/users").send({
        name: "John Smith",
      })

      expect(response.body).toEqual({ userId: "userId" })
    })

    it("should return status 500 when got Technical Error", () => {})

    it("should return status 400 when got Business Error")

    it("should return status 400 when name is missing")
  })
})
