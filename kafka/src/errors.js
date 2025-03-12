// eslint-disable-next-line consistent-return
export async function errorHandler(c, next) {
  try {
    await next()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error occurred:", error)

    return c.json(
      { error: "Internal Server Error", details: error.message },
      500,
    )
  }
}
