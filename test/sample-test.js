const { expect } = require("chai");
const { ethers, artifacts } = require("hardhat");
const NestcoinToken = artifacts.require("Nestcoin Token")

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



  describe("Transaction", function () {

    it('Should make batch transfer ', async function() {
      const BatchTranfer = await NestcoinToken.transfer(addr1, ...addrs);
      expect(BatchTranfer).to.increase(200);

      //owner to check the remaining token after distribution
      const CheckTokenBalance = await NestcoinToken.balanceOf(owner.address);
      expect(CheckTokenBalance).sub(totalSupply);

      //current user to check their balance
      const UserBalance = await NestcoinToken.balanceOf(addr1, ...addrs);
      expect(UserBalance).to.increase(200);

      
    })

  });

});
