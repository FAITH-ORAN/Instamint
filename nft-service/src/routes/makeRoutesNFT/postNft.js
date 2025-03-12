import { PrismaClient } from "@prisma/client"
import fs from "fs"
import Web3 from "web3"
import { sendMintedNFTMessage } from "../../producer/createNFTProducer.js"

const prisma = new PrismaClient()
const abi = JSON.parse(fs.readFileSync("SimpleNFT.abi", "utf8"))
const contractAddress = "0x0b6ed84b8d6a39cdf4614483782fbd97f2b972e5"
const postNft = (app) => {
  app.post("/nft", async (c) => {
    const userId = c.req.query("userId")
    const contentId = c.req.query("contentId")
    const contentUrl = c.req.query("contentUrl")
    const marketplace = c.req.query("marketplace")

    try {
      if (!userId || !contentId || !contentUrl || !marketplace) {
        return c.json({ error: "Missing required fields" }, 400)
      }

      const nft = await prisma.nFT.create({
        data: {
          userId: parseInt(userId, 10),
          contentId: parseInt(contentId, 10),
          contentUrl,
          marketplace,
          minted: false,
          transactionHash: null,
        },
      })
      const provider = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
      const web3 = new Web3(provider)
      const account = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY)
      web3.eth.accounts.wallet.add(account)
      const contract = new web3.eth.Contract(abi, contractAddress)
      const mintTx = contract.methods.mint(account.address)
      const gas = await mintTx.estimateGas({ from: account.address })
      const gasPrice = await web3.eth.getGasPrice()
      const tx = {
        from: account.address,
        to: contractAddress,
        data: mintTx.encodeABI(),
        gas,
        gasPrice,
      }
      const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.SIGNER_PRIVATE_KEY)
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

      if (receipt.status) {
        await prisma.nFT.update({
          where: { id: nft.id },
          data: { minted: true, transactionHash: receipt.transactionHash },
        })

        const message = {
          userId,
          contentId,
          transactionHash: receipt.transactionHash,
          contentUrl,
          nftId: nft.id,
          marketplace
        }
        await sendMintedNFTMessage(message)

        return c.json({ message: "NFT minted successfully", nft: { ...nft, minted: true, transactionHash: receipt.transactionHash } }, 201)
      } 
        
return c.json({ message: "NFT created but minting failed", nft }, 201)
    } catch (error) {
return c.json({ error: "Failed to create NFT record" }, 500)
    }
  })
}

export default postNft