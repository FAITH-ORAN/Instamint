import axios from "axios"

const getAllMarket = async (c) => {
  try {
    const response = await axios.get(
      `${process.env.URL_APPLICATION_MARKET}/nft-market`,
    )

    return c.json(response.data)
  } catch (error) {
    return c.json({ error: "Failed to proxy request" }, 500)
  }
}

export default getAllMarket
