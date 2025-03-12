import getAllMarket from "./getMarket.js"
import getNFTMarketDetail from "./getNFTMarketDetail.js"
import postMarket from "./postMarket.js"

const makeRoutesMarket = (app) =>{
  postMarket(app)
  getAllMarket(app)
  getNFTMarketDetail(app)
}

export default makeRoutesMarket