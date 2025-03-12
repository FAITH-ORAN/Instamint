import getAllMarket from "./getAllMarket.js"
import getNFTMarketDetail from "./getNFTInMarketById.js"

const makeRoutesMarket = (app) => {
  app.get("/nft-market", getAllMarket)
  app.get("/nft-market/:nftId", getNFTMarketDetail)
}

export default makeRoutesMarket