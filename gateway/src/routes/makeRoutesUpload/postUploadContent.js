const postUploadContent = (c) => {
  const payload = c.get("jwtPayload")
  const userId = payload ? payload.id : "unknown"

  return c.redirect(
    `${process.env.URL_APPLICATION_CONTENT}/upload?userId=${userId}`,
    307,
  )
}

export default postUploadContent
