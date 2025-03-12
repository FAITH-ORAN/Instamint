import postSignin from "./makeRoutesSign/postSignin.js"
import postSignup from "./makeRoutesSign/postSignup.js"
import verify2FA from "./makeRoutesSign/verify2FA.js"
import generateOTP from "./makeRoutesSign/generate-2FA.js"
import toggle2FA from "./makeRoutesSign/toogle-2FA.js"
import check2FA from "./makeRoutesSign/check-2FA.js"

const makeRoutesSign = ({ app }) => {
  postSignin({ app })
  postSignup({ app })
  verify2FA({ app })
  generateOTP({ app })
  toggle2FA({ app })
  check2FA({ app })
}

export default makeRoutesSign
