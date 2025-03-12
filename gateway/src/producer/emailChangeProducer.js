import "dotenv/config"
import { CompressionTypes, Kafka, logLevel } from "kafkajs"

const host = process.env.HOST_IP || "localhost"
const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  brokers: [`${host}:9092`],
  clientId: "changeemail-producer",
})
const topic = "change-email"
const producer = kafka.producer()
const emailChangeProducer = async (email, token) => {
  try {
    await producer.connect()

    await producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [{ value: JSON.stringify({ email, token }) }],
    })
  } catch (error) {
    throw new Error(
      "[Producer] Error sending change email data to Kafka",
      error,
    )
  }
}

export default emailChangeProducer
