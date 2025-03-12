import { Hono } from "hono"
import postNft from "../src/routes/makeRoutesNFT/postNft.js"

const app = new Hono()
postNft(app)

describe("POST /nft Tests", () => {
  it("should return 400 for requests with missing required fields", async () => {
    const reqWithoutFields = new Request(
      `${process.env.URL_APPLICATION}/nft`,
      {
        method: "POST",
        body: null,
      },
    )
    const resWithoutFields = await app.request(reqWithoutFields)
    const jsonResponse = await resWithoutFields.json()
    expect(resWithoutFields.status).toBe(400)
    expect(jsonResponse).toHaveProperty("error", "Missing required fields")
  })
})
