import "dotenv/config"
import { CompressionTypes, Kafka, logLevel } from "kafkajs"

const host = process.env.HOST_IP || "localhost"
const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  brokers: [`${host}:9092`],
  clientId: "createminter-producer",
})
const topic = "create-minter"
const producer = kafka.producer()
const sendCreateMinterdData = async (userId, langage) => {
  try {
    await producer.connect()

    await producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [{ value: JSON.stringify({ userId, langage }) }],
    })
  } catch (error) {
    throw new Error(
      "[Producer] Error sending createMinter data to Kafka",
      error,
    )
  }
}

export default sendCreateMinterdData
