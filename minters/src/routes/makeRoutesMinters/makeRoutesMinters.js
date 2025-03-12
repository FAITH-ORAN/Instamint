import getMinterIdProfile from "./getMinterIdProfile.js"
import getMinterProfile from "./getMinterProfile.js"
import patchUpdateMinterProfile from "./patchUpdateMinterProfile.js"
import patchVisibilityMinterProfile from "./patchVisibilityProfile.js"
import postCreateMinter from "./postCreateMinter.js"

const makeRoutesMinters = ({ app }) => {
  postCreateMinter({ app })
  getMinterIdProfile({ app })
  patchUpdateMinterProfile({ app })
  getMinterProfile({ app })
  patchVisibilityMinterProfile({ app })
}

export default makeRoutesMinters
