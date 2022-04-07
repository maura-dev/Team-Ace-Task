const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nestcoin Token", function() {
  describe("mint token", function() {  
    it("Should mint 30 million NXT", async function() {
      const NestcoinToken = await ethers.getContractFactory("NestcoinToken")
      const nestcoin_token = await NestcoinToken.deploy()
      await nestcoin_token.deployed()

      const owner = await nestcoin_token._owner()
      const actualBalance = await nestcoin_token.balanceOf(owner)

      const decimals = ethers.BigNumber.from(10 ** 9).pow(2)
      const expectedBalance = ethers.BigNumber.from(30000000).mul(decimals)

      console.log("\tExpected balance: ", expectedBalance.toBigInt())
      console.log("\tActual balance: ", actualBalance.toBigInt())

      expect(expectedBalance).to.equal(actualBalance)
    })
  })

  describe("swap token", function() {
    // it("User token should reduce after token swap", async function() {
    //   const NestcoinToken = await ethers.getContractFactory("NestcoinToken")
    //   const nestcoin_token = await NestcoinToken.deploy()
    //   await nestcoin_token.deployed()

    // })
  })

  describe("Token contract", function () {
    let contract;
    let NestcoinToken;
    let owner;
    let addr1;
    let addrs;
  
    beforeEach(async function () {
      [owner, addr1, ...addrs] = await ethers.getSigners(); 
  
      NestcoinToken = await ethers.getContractFactory("BatchTransact")
      contract = await NestcoinToken.deploy()
    });
  
    describe("BatchTranfer", function () {
  
      // it('Should ', async function() {
      //   await contract.;
      //   console.log("")
      // })
    });
  });
})
