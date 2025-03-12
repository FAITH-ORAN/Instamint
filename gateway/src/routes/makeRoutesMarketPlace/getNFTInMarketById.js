import axios from "axios"

const getNFTMarketDetail = async (c) => {
  const nftId = c.req.param("nftId")

  try {
    const response = await axios.get(
      `${process.env.URL_APPLICATION_MARKET}/nft-market/${nftId}`
    )

    return c.json(response.data)
  } catch (error) {
    return c.json({ error: "Failed to proxy request" }, 500)
  }
}

export default getNFTMarketDetail
