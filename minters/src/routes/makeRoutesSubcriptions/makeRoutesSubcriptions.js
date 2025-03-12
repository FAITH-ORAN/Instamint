import getFollowersMinters from "./getFollowersMinters.js"
import getFollowingMinters from "./getFollowingMinters.js"
import postFollowMinters from "./postFollowMinters.js"

const makeRoutesSubcriptions = ({ app }) => {
  postFollowMinters({ app })
  getFollowingMinters({ app })
  getFollowersMinters({ app })
}

export default makeRoutesSubcriptions
