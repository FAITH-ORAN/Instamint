import postConfirmationEmail from "./makeRoutesEmail/postConfirmationEmail"

const makeRoutesEmail = ({ app }) => {
  postConfirmationEmail({ app })
}

export default makeRoutesEmail
