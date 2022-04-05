const { expect } = require("chai");
const { ethers } = require("hardhat");

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
