import { EmailClient } from "@azure/communication-email"
import "dotenv/config"

const sendResetPasswordEmail = async (email, username, token) => {
  try {
    const client = new EmailClient(process.env.AZURE_EMAIL_COMMUNICATION)
    const message = {
      senderAddress: process.env.AZURE_EMAIL_SENDER,
      content: {
        subject: "Reinitialisation du mot de passe",
        plainText: `Voici le lien de reinitialisation du mot de passe ${process.env.URL_APPLICATION}/resetpassword/${token}`,
      },
      recipients: {
        to: [
          {
            address: email,
            displayName: username,
          },
        ],
      },
    }
    const poller = await client.beginSend(message)
    await poller.pollUntilDone()

    return { email, username, token }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error sending confirmation e-mail:", error)
    throw error
  }
}

export default sendResetPasswordEmail
