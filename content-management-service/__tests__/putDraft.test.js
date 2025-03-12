import { Hono } from "hono"
import makeRoutesDraft from "../src/routes/makeRoutesDraft/makeRoutesDraft.js"

const app = new Hono()
makeRoutesDraft(app)

describe("PUT /draft/:contentId Tests", () => {
  it("should handle non-existing content ID correctly", async () => {
    const nonExistingContentId = 999999
    const reqWithNonExistingContentId = new Request(
      `${process.env.URL_APPLICATION}/draft/${nonExistingContentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: "Test description",
          authorName: "Test author",
          hashtag: ["test"],
          location: "Test location",
        }),
      }
    )
    const resWithNonExistingContentId = await app.request(
      reqWithNonExistingContentId
    )
    expect(resWithNonExistingContentId.status).toBe(404)

    const jsonResponse = await resWithNonExistingContentId.json()
    expect(jsonResponse).toHaveProperty("error", "Draft not found")
  })

  it("should handle invalid content ID format", async () => {
    const invalidContentId = "abc"
    const reqWithInvalidContentId = new Request(
      `${process.env.URL_APPLICATION}/draft/${invalidContentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: "Test description",
          authorName: "Test author",
          hashtag: ["test"],
          location: "Test location",
        }),
      }
    )
    const resWithInvalidContentId = await app.request(reqWithInvalidContentId)
    expect(resWithInvalidContentId.status).toBe(400)

    const jsonResponse = await resWithInvalidContentId.json()
    expect(jsonResponse).toHaveProperty("error", "Invalid or missing Content ID")
  })
})
