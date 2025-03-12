import axios from "axios"

const deleteUploadContent = async (c) => {
  const contentId = c.req.param("contentId")

  try {
    const response = await axios.delete(
      `${process.env.URL_APPLICATION_CONTENT}/upload/${contentId}`,
    )

    if (response.status === 204) {
      return c.json({ message: "Content deleted successfully" })
    }

    return c.json(response.data)
  } catch (error) {
    return c.json({ error: "Failed to proxy delete request" }, 500)
  }
}

export default deleteUploadContent
