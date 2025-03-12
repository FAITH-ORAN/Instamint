const postNFT = async (c) => {
  const payload = c.get("jwtPayload")
  const userId = payload ? payload.id : "unknown"
  const body = await c.req.json()
  const { contentId, contentUrl, marketplace } = body
    const redirectUrl = `${process.env.URL_APPLICATION_NFT}/nft?userId=${userId}&contentId=${contentId}&contentUrl=${encodeURIComponent(contentUrl)}&marketplace=${encodeURIComponent(marketplace)}`

  return c.redirect(redirectUrl, 307)
}

export default postNFT
