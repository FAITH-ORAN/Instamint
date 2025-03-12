import axios from "axios"

const getUploadContent = async (c) => {
  const contentId = c.req.param("contentId")

  try {
    const response = await axios.get(
      `${process.env.URL_APPLICATION_CONTENT}/uploaded-content/${contentId}`,
    )

    return c.json(response.data)
  } catch (error) {
    return c.json({ error: "Failed to proxy request" }, 500)
  }
}

export default getUploadContent
