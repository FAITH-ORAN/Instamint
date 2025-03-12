import { Hono } from "hono"
import makeRoutesUpload from "../src/routes/makeRoutesUpload/makeRoutesUpload.js"

const app = new Hono()
makeRoutesUpload(app)

describe("GET /upload/:userId Tests", () => {
  it("should return content list for a given user", async () => {
    const reqWithValidUser = new Request(
      `${process.env.URL_APPLICATION}/upload/123`,
      {
        method: "GET",
      },
    )
    const resWithValidUser = await app.request(reqWithValidUser)
    expect(resWithValidUser.status).toBe(200)

    const jsonResponse = await resWithValidUser.json()
    expect(Array.isArray(jsonResponse)).toBeTruthy()
  })

  it("should handle missing user ID", async () => {
    const reqWithMissingUser = new Request(
      `${process.env.URL_APPLICATION}/upload`,
      {
        method: "GET",
      },
    )
    const resWithMissingUser = await app.request(reqWithMissingUser)
    expect(resWithMissingUser.status).toBe(404)
  })
})
