import { sanitizeResetPassword, sanitizeUser } from "../../sanitizers.js"
import sendConfirmationEmail from "../../services/sendConfirmationEmail.js"
import sendEmailResetConfirmation from "../../services/sendEmailResetConfirmation.js"
import sendResetPasswordEmail from "../../services/sendResetEmail.js"
const postConfirmationEmail = ({ app }) => {
  app.post("/verify-email", async (c) => {
    try {
      const { email, username, id } = await c.req.json()
      const sendMail = await sendConfirmationEmail(email, username, id)

      return c.json({ result: sanitizeUser(sendMail) })
    } catch (error) {
      return c.json({ error: "Failed to send email" }, 500)
    }
  })

  app.post("/reset-password-email", async (c) => {
    try {
      const { email, username, token } = await c.req.json()
      const sendMail = await sendResetPasswordEmail(email, username, token)

      return c.json({ result: sanitizeResetPassword(sendMail) })
    } catch (error) {
      return c.json({ error: "Failed to send email" }, 500)
    }
  })

  app.post("/request-email-change", async (c) => {
    const { newEmail, token } = await c.req.json()
    await sendEmailResetConfirmation(newEmail, token)

    return c.json({ message: "Verification email sent" })
  })
}

export default postConfirmationEmail
