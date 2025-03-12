import axios from "axios"
import "dotenv/config"
import { Kafka, logLevel } from "kafkajs"

const host = process.env.HOST_IP || "localhost"
const contentManagementUrl = process.env.CONTENT_MANAGEMENT_SERVICE_URL
const marketplaceServiceUrl = process.env.MARKET_PLACE_SERVICE_URL
const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: "nft-minted-consumer",
})
const topic = "minted-nft"
const consumer = kafka.consumer({ groupId: "nft-minted-group" })
const createNFTConsumes = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })


  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const nftData = JSON.parse(message.value.toString())
        const { contentId, userId, contentUrl, marketplace, nftId  } = nftData

        if (!contentId || !userId || !contentUrl || !marketplace || !nftId) {
          throw new Error("Missing contentId in the Kafka message.")
        }

        const status = "nft"
        const requestUrl = `${contentManagementUrl}/update-status/${contentId}`
        const requestBody = { status }

        await axios.put(requestUrl, requestBody)

        const requestUrlMarketplace = `${marketplaceServiceUrl}/nft?userId=${userId}&nftId=${nftId}&contentUrl=${encodeURIComponent(contentUrl)}&marketplace=${encodeURIComponent(marketplace)}`
        await axios.post(requestUrlMarketplace)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error processing message:", error)
      }
    },
  })
}

export default createNFTConsumes
