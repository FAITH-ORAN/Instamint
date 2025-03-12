import "dotenv/config"
import { Kafka, CompressionTypes, logLevel } from "kafkajs"

const host = process.env.HOST_IP || "localhost"
const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  brokers: [`${host}:9092`],
  clientId: "signup-producer",
})
const topic = "user-signup"
const producer = kafka.producer()
const sendSignUpData = async (user) => {
  try {
    await producer.connect()

    await producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [{ value: JSON.stringify(user) }],
    })
  } catch (error) {
    throw new Error("[Producer] Error sending sign-up data to Kafka", error)
  }
}

export { sendSignUpData }
