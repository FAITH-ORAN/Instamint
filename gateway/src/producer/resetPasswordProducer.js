import "dotenv/config"
import { Kafka, CompressionTypes, logLevel } from "kafkajs"

const host = process.env.HOST_IP || "localhost"
const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  brokers: [`${host}:9092`],
  clientId: "resetpassword-producer",
})
const topic = "user-reset-password"
const producer = kafka.producer()
const sendResetPasswordData = async (email, token, username) => {
  try {
    await producer.connect()

    await producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [{ value: JSON.stringify({ email, token, username }) }],
    })
  } catch (error) {
    throw new Error(
      "[Producer] Error sending resetPassword data to Kafka",
      error,
    )
  }
}

export { sendResetPasswordData }
