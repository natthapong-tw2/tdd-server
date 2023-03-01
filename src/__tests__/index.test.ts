import supertest from "supertest"

describe("index", () => {
  describe("GET /health-check", () => {
    it("should return 200", async () => {
      const actual = await supertest("http://localhost:8080")
        .get("/health-check")

      expect(actual.status).toEqual(200)
    })
  })

  describe("GET /users", () => {
    it("should return 200", async () => {
      const actual = await supertest("http://localhost:8080")
        .get("/users")

      expect(actual.status).toEqual(200)
    })

    it("should return list of users", async () => {
      const actual = await supertest("http://localhost:8080")
        .get("/users")

      expect(actual.body).toEqual([])
    })
  })

  describe("GET /shops", () => {
    it("should return status code as 200", async () => {
      const actual = await supertest("http://localhost:8080")
        .get("/shops")


      expect(actual.status).toEqual(200)
    })
  })

  describe("POST /financial-planner", () => {
    it("should return not found when not have access", async () => {
      const actual = await supertest("http://localhost:8080")
        .post("/financial-planner")

      expect(actual.status)
        .toEqual(404)
    })

    it("should return 200 when it contains authorization header", async () => {
      const actual = await supertest("http://localhost:8080")
        .post("/financial-planner")
        .set({ Authorization: "abc" })

      expect(actual.status)
        .toEqual(200)
    })
  })
})
