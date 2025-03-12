import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: "nft-producer",
  brokers: ["localhost:9092"], 
})
const producer = kafka.producer()

export const sendMintedNFTMessage = async (message) => {
  try {
    await producer.connect()
    await producer.send({
      topic: "minted-nft",
      messages: [{ value: JSON.stringify(message) }],
    })
  } catch (error) {
    throw new Error(
      "[Producer] Error sending createNFT data to Kafka",
      error,
    )
  } finally {
    await producer.disconnect()
  }
}
