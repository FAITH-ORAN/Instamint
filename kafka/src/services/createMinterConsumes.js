import axios from "axios"
import "dotenv/config"
import { Kafka, logLevel } from "kafkajs"

const host = process.env.HOST_IP || "localhost"
const gatewayUrl = process.env.GATEWAY_SERVICE_URL
const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: "create-minter-consumer",
})
const topic = "create-minter"
const consumer = kafka.consumer({ groupId: "create-minter-group" })
const createMinterConsumer = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    // eslint-disable-next-line consistent-return
    eachMessage: async ({ message }) => {
      try {
        const { userId, langage } = JSON.parse(message.value.toString())

        if (!userId || !langage) {
          throw new Error("Missing data to send confirmation email from Kafka.")
        }

        await axios.post(`${gatewayUrl}/api/minter`, {
          userId: parseInt(userId, 10),
          language: langage,
        })

        return { success: true }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error processing message:", error)
      }
    },
  })
}

export default createMinterConsumer
