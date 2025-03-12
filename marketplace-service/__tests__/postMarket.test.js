import { Hono } from "hono"
import makeRoutesMarket from "../src/routes/makeRoutesMarket/makeRoutesMarket.js"

const app = new Hono()
makeRoutesMarket(app)

describe("POST /nft Tests", () => {
  it("should return 400 for requests with missing fields", async () => {
    const reqWithoutFields = new Request(`${process.env.URL_APPLICATION}/nft`, {
      method: "POST",
      body: null,
    })
    const resWithoutFields = await app.request(reqWithoutFields)
    const jsonResponse = await resWithoutFields.json()
    expect(resWithoutFields.status).toBe(400)
    expect(jsonResponse).toHaveProperty("error", "Missing required fields")
  })
})
