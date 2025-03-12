import axios from "axios"

const getUploadContent = async (c) => {
  const userId = c.req.param("userId")

  try {
    const response = await axios.get(
      `${process.env.URL_APPLICATION_CONTENT}/upload/${userId}`,
    )

    return c.json(response.data)
  } catch (error) {
    return c.json({ error: "Failed to proxy request" }, 500)
  }
}

export default getUploadContent
