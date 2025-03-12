export async function errorHandler(c, next) {
  try {
    await next()

    return null
  } catch (error) {
    return c.json(
      { error: "Internal Server Error", details: error.message },
      500,
    )
  }
}
