import axios from "axios"

const getDraftContent = async (c) => {
  const contentId = c.req.param("contentId")

  try {
    const response = await axios.get(
      `${process.env.URL_APPLICATION_CONTENT}/draft/${contentId}`
    )

    return c.json(response.data)
  } catch (error) {
    return c.json({ error: "Failed to proxy request" }, 500)
  }
}

export default getDraftContent
