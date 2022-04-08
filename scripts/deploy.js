const { ethers } = require("hardhat");
const fs = require('fs')

const contractName = "NestcoinToken"

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  
  const NestcoinToken = await ethers.getContractFactory("NestcoinToken")

  const contract = await NestcoinToken.deploy()

  const address = JSON.stringify({
    "contractAddress": contract.address,
  })

  console.log("Contract address is : ", contract.address)
  await contract.deployed()
  const abi = fs.readFileSync('src/artifacts/contracts/NestcoinToken.sol/NestcoinToken.json');

  

  fs.writeFileSync('./src/artifacts/contracts/abi.json', abi);
  fs.writeFileSync('./src/contracts/contract_address.json', address)

}

const runMain = async () => {
    try {
      await main()
      process.exit(0)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
}
  
runMain()