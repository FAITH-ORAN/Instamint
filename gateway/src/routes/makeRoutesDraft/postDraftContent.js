const postDraftContent = (c) => c.redirect(
    `${process.env.URL_APPLICATION_CONTENT}/draft`,
    307
  )

export default postDraftContent
