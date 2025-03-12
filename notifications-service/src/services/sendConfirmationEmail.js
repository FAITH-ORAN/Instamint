import { EmailClient } from "@azure/communication-email"
import "dotenv/config"

const sendConfirmationEmail = async (email, username, id) => {
  try {
    const client = new EmailClient(process.env.AZURE_EMAIL_COMMUNICATION)
    const message = {
      senderAddress: process.env.AZURE_EMAIL_SENDER,
      content: {
        subject: "Activation",
        plainText: `Voici le lien d'activation ${process.env.URL_APPLICATION}/activation-success/${id}`,
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

    return { email, username, id }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error sending confirmation e-mail:", error)
    throw error
  }
}

export default sendConfirmationEmail
