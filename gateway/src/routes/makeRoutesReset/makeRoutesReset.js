import postReset from "./postReset.js"
import postResetPassword from "./postResetPassword.js"
import requestEmailChange from "./requestEmailChange.js"
import requestPasswordChange from "./requestPasswordChange.js"
import resetEmail from "./resetEmail.js"
const makeRoutesReset = ({ app }) => {
  postReset({ app })
  postResetPassword({ app })
  requestEmailChange({ app })
  requestPasswordChange({ app })
  resetEmail({ app })
}

export default makeRoutesReset
