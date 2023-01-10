import supertest from "supertest"

describe("index", () => {
  describe("health-check", () => {
    it("should return 200", async () => {
      const actual = await supertest("http://localhost:8080")
        .get("/health-check")

      expect(actual.status).toEqual(200)
    })
  })
})
