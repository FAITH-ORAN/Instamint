import { Hono } from "hono"
import makeRoutesDraft from "../src/routes/makeRoutesDraft/makeRoutesDraft"

const app = new Hono()
makeRoutesDraft(app)

describe("GET /draft/:contentId Tests", () => {
  it("should return draft content", async () => {
    const reqWithValidContent = new Request(
      `${process.env.URL_APPLICATION}/draft/106`,
      {
        method: "GET",
      }
    )
    const resWithValidContent = await app.request(reqWithValidContent)
    expect(resWithValidContent.status).toBe(200)

    const jsonResponse = await resWithValidContent.json()
    expect(typeof jsonResponse).toBe("object")
    expect(jsonResponse).toHaveProperty("contentId")
    expect(jsonResponse).toHaveProperty("description")
    expect(jsonResponse).toHaveProperty("authorName")
    expect(jsonResponse).toHaveProperty("hashtag")
    expect(jsonResponse).toHaveProperty("location")
  })

  it("should handle invalid content ID", async () => {
    const reqWithInvalidContentId = new Request(
      `${process.env.URL_APPLICATION}/draft/abc`,
      {
        method: "GET",
      }
    )
    const resWithInvalidContentId = await app.request(reqWithInvalidContentId)
    expect(resWithInvalidContentId.status).toBe(400)
  })

  it("should return 404 for non-existing content ID", async () => {
    const reqWithNonExistingContent = new Request(
      `${process.env.URL_APPLICATION}/draft/999`,
      {
        method: "GET",
      }
    )
    const resWithNonExistingContent = await app.request(reqWithNonExistingContent)
    expect(resWithNonExistingContent.status).toBe(404)
  })
})
