/* eslint no-return-await: "error" */
import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import solc from "solc"
import Web3 from "web3"
import winston from "winston"

dotenv.config()

const infuraApiKey = process.env.INFURA_API_KEY
const privateKey = process.env.SIGNER_PRIVATE_KEY
const baseURI = process.env.BASE_URI

if (!privateKey || !privateKey.startsWith("0x") || privateKey.length !== 66) {
  throw new Error("Invalid Private Key. Please check your .env file.")
}

const provider = new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${infuraApiKey}`)
const web3 = new Web3(provider)
const account = web3.eth.accounts.privateKeyToAccount(privateKey)
web3.eth.accounts.wallet.add(account)

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
})
const source = fs.readFileSync("SimpleNFT.sol", "utf8")
const findImports = (importPath) => {
  try {
    const filePath = path.resolve("node_modules", importPath)
    const content = fs.readFileSync(filePath, "utf8")

    
return { contents: content }
  } catch (e) {
    return { error: "File not found" }
  }
}
const input = {
  language: "Solidity",
  sources: {
    "SimpleNFT.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
}
const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }))

if (!output.contracts || !output.contracts["SimpleNFT.sol"] || !output.contracts["SimpleNFT.sol"].SimpleNFT) {
  throw new Error("Compilation failed or contract not found in output. Please check the Solidity code and try again.")
}

const contractData = output.contracts["SimpleNFT.sol"].SimpleNFT
const deploy = async () => {
  try {
    fs.writeFileSync("SimpleNFT.abi", JSON.stringify(contractData.abi))
    const { abi, evm } = contractData
    const contract = new web3.eth.Contract(abi)
    const deployTx = contract.deploy({
      data: evm.bytecode.object,
      arguments: [baseURI], 
    })
    const gas = await deployTx.estimateGas({ from: account.address })
    const gasPrice = await web3.eth.getGasPrice()
    const tx = {
      from: account.address,
      data: deployTx.encodeABI(),
      gas,
      gasPrice,
    }
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey)
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    logger.info("Contract deployed at address:", receipt.contractAddress)

    return receipt.contractAddress
  } catch (error) {
    logger.error("Error deploying contract:")
    throw error
  }
}

deploy().then(address => {
  logger.info("Deployment successful, contract address:", address)
}).catch(() => {
  logger.error("Deployment failed:")
})
