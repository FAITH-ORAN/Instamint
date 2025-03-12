import { Hono } from "hono"
import makeRoutesUpload from "../src/routes/makeRoutesUpload/makeRoutesUpload.js"

const app = new Hono()
makeRoutesUpload(app)

describe("POST /upload Tests", () => {
  it("should handle file uploads correctly", async () => {
    const formDataEmpty = new FormData()
    formDataEmpty.append("userId", "123")

    const reqWithoutFile = new Request(
      `${process.env.URL_APPLICATION}/upload`,
      {
        method: "POST",
        body: formDataEmpty,
      },
    )
    const resWithoutFile = await app.request(reqWithoutFile)
    const jsonResponse = await resWithoutFile.json()
    expect(resWithoutFile.status).toBe(400)
    expect(jsonResponse).toHaveProperty("error", "No file uploaded")
  })
})
