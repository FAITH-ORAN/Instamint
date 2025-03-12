# NFT Service Documentation

## Overview
This service allows users to mint NFTs (Non-Fungible Tokens) on the Sepolia testnet using Infura for blockchain interactions and MetaMask for managing Ethereum accounts.

## Prerequisites
- MetaMask extension installed on your browser
- Infura account

## Setup Instructions

### 1. Create an Infura Account
1. Visit [Infura](https://infura.io/) and sign up for an account.
2. Create a new project and select "Ethereum" as the network.
3. Copy your Project ID.

### 2. Set Up MetaMask
1. Install the [MetaMask extension](https://metamask.io/) for your browser.
2. Create a new wallet or import an existing wallet.
3. Switch to the Sepolia test network:
   - Open MetaMask and click on the network dropdown.
   - Select "Sepolia Test Network".
4. Get Sepolia ETH from a faucet like [https://cloud.google.com/application/web3/faucet/ethereum/sepolia](https://www.alchemy.com/sepolia-faucet).

### 3. Configure Environment Variables
Create a `.env` file in the root of your project with the following content:

```dotenv
INFURA_API_KEY=<Your Infura Project ID>
SIGNER_PRIVATE_KEY=<Your MetaMask Private Key>
CONTRACT_ADDRESS_KEY=<your-contract-address>
```
### 4. Deploy Your Smart Contract
To deploy your NFT smart contract, you need the following files:

SimpleNFT.sol: Your Solidity contract file.
deploy.js: Script to deploy the contract.
.abi: ABI (Application Binary Interface) file of your contract.
Steps to deploy the contract:

run  => node Deploy.js => a samrt contract will be deployed and .abi file extension will be generated automatically. in the logs we can see the address contract.
