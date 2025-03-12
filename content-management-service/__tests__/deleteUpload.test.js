import { Hono } from "hono"
import makeRoutesUpload from "../src/routes/makeRoutesUpload/makeRoutesUpload.js"

const app = new Hono()
makeRoutesUpload(app)

describe("DELETE /upload/:contentId Tests", () => {
  it("should handle non-existing content ID correctly", async () => {
    const nonExistingContentId = 999999
    const reqWithNonExistingContentId = new Request(
      `${process.env.URL_APPLICATION}/upload/${nonExistingContentId}`,
      { method: "DELETE" },
    )
    const resWithNonExistingContentId = await app.request(
      reqWithNonExistingContentId,
    )
    expect(resWithNonExistingContentId.status).toBe(404)

    const jsonResponse = await resWithNonExistingContentId.json()
    expect(jsonResponse).toHaveProperty("error", "Content not found")
  })

  it("should handle invalid content ID format", async () => {
    const invalidContentId = "abc"
    const reqWithInvalidContentId = new Request(
      `${process.env.URL_APPLICATION}/upload/${invalidContentId}`,
      { method: "DELETE" },
    )
    const resWithInvalidContentId = await app.request(reqWithInvalidContentId)
    expect(resWithInvalidContentId.status).toBe(400)

    const jsonResponse = await resWithInvalidContentId.json()
    expect(jsonResponse).toHaveProperty("error", "Invalid Content ID")
  })
})
