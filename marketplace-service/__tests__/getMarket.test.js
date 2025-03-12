import { Hono } from "hono"
import makeRoutesMarket from "../src/routes/makeRoutesMarket/makeRoutesMarket.js"

const app = new Hono()
makeRoutesMarket(app)

describe("GET /nft-market Tests", () => {
  it("should return NFT market data", async () => {
    const req = new Request(`${process.env.URL_APPLICATION}/nft-market`, {
      method: "GET",
    })
    const res = await app.request(req)
    expect(res.status).toBe(200)

    const jsonResponse = await res.json()
    expect(Array.isArray(jsonResponse)).toBeTruthy()
  })

  it("should handle no NFT market data", async () => {
    const req = new Request(`${process.env.URL_APPLICATION}/nft-market`, {
      method: "GET",
    })
    const res = await app.request(req)
    expect(res.status).toBe(200)

    const jsonResponse = await res.json()
    expect(Array.isArray(jsonResponse)).toBeTruthy()
  })
})
