
const putDraftContent = (c) => {
  const contentId = c.req.param("contentId")

  
return c.redirect(
    `${process.env.URL_APPLICATION_CONTENT}/draft/${contentId}`,
    307
  )
}

export default putDraftContent
