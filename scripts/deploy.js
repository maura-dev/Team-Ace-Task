const { ethers } = require("hardhat");
const fs = require('fs')

const contractName = "NestcoinToken"

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  
  const NestcoinToken = await ethers.getContractFactory(`${contractName}`)

  const contract = await NestcoinToken.deploy()
  console.log("Contract deployed to address: ", contract.address)

  await contract.deployed()
  const abi = fs.readFileSync(`./artifacts/contracts/${contractName}.sol/${contractName}.json`);

  fs.writeFileSync('./src/contracts/abi.json', abi);
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
