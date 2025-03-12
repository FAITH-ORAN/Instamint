import axios from "axios"
import "dotenv/config"
import { Kafka, logLevel } from "kafkajs"

const notificationUrl = process.env.NOTIFICATION_SERVICE_URL
const host = process.env.HOST_IP || "localhost"
const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: "changeemail-consumer",
})
const topic = "change-email"
const consumer = kafka.consumer({ groupId: "change-email-group" })
const changeEmailConsumes = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    // eslint-disable-next-line consistent-return
    eachMessage: async ({ message }) => {
      try {
        const { email, token } = JSON.parse(message.value.toString())
        await axios.post(`${notificationUrl}/request-email-change`, {
          newEmail: email,
          token,
        })

        return { success: true }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error processing message:", error)
      }
    },
  })
}

export default changeEmailConsumes
