import getUserInformation from "./makeRoutesUser/getUserInformations.js"
import updateUser from "./makeRoutesUser/updateUser.js"

const makeRoutesUser = ({ app }) => {
  updateUser({ app })
  getUserInformation({ app })
}

export default makeRoutesUser
