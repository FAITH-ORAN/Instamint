import { Hono } from "hono"
import makeRoutesDraft from "../src/routes/makeRoutesDraft/makeRoutesDraft.js"

const app = new Hono()
makeRoutesDraft(app)

describe("POST /draft Tests", () => {
  it("should return 400 for requests with no body", async () => {
 const reqWithoutBody= new Request(
      `${process.env.URL_APPLICATION}/draft`,
      {
        method: "POST",
        body: null,
      },
    )
    const resWithoutBody = await app.request(reqWithoutBody)
    const jsonResponse = await resWithoutBody.json()
    expect(resWithoutBody.status).toBe(400)
    expect(jsonResponse).toHaveProperty("error", "No request body")
  })
})
