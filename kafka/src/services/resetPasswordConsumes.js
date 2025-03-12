import "dotenv/config"
import { Kafka, logLevel } from "kafkajs"
import axios from "axios"

const host = process.env.HOST_IP || "localhost"
const notificationUrl = process.env.NOTIFICATION_SERVICE_URL
const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: "reset-password-consumer",
})
const topic = "user-reset-password"
const consumer = kafka.consumer({ groupId: "user-reset-password-group" })
const resetPasswordConsumer = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    // eslint-disable-next-line consistent-return
    eachMessage: async ({ message }) => {
      try {
        const userData = JSON.parse(message.value.toString())
        const { email, token, username } = userData

        if (!email || !username || !token) {
          throw new Error("Missing data to send confirmation email from Kafka.")
        }

        await axios.post(`${notificationUrl}/reset-password-email`, {
          email: userData.email,
          username: userData.username,
          token: userData.token,
        })

        return { success: true }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error processing message:", error)
      }
    },
  })
}

export default resetPasswordConsumer
