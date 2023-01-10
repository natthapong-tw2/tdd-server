import supertest from "supertest"

describe("index", () => {
  it("should pass", async () => {
    const actual = await supertest("https://google.com")

    console.log(actual)
    expect(actual).toBeTruthy()
  })
})
