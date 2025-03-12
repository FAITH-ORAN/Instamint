import { EmailClient } from "@azure/communication-email"
import "dotenv/config"

const sendEmailResetConfirmation = async (email, token) => {
  try {
    const client = new EmailClient(process.env.AZURE_EMAIL_COMMUNICATION)
    const message = {
      senderAddress: process.env.AZURE_EMAIL_SENDER,
      content: {
        subject: "Confirmation email",
        plainText: `Voici le lien de confirmation d'email ${process.env.URL_APPLICATION}/changeemail/${token}`,
      },
      recipients: {
        to: [
          {
            address: email,
          },
        ],
      },
    }
    const poller = await client.beginSend(message)
    await poller.pollUntilDone()

    return { email, token }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error sending confirmation e-mail:", error)
    throw error
  }
}

export default sendEmailResetConfirmation
