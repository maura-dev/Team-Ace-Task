///SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NestcoinToken is ERC20 {
  address public _owner;
  address public batchOperator;

  event SwapToken (address indexed from,  uint256 value, string item);

  //minting the NXT token and assigning it to an owner(i.e the deployer)
  //the initial batch operator (i.e address that should run the batch transactions is set to the owner(i.e the deployer))
  constructor() ERC20("Nestcoin", "NXT") {
        _mint(msg.sender, 30000000 * 10 ** 18);
        _owner = msg.sender;
        batchOperator = _owner;
    }

    function swapToken(uint256 amount, string memory item) public returns (bool) {
        transfer(_owner, amount);
        emit SwapToken(msg.sender, amount, item);
        return true;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "You're not authorised to perform this function");
        _;
    }

    modifier onlyBatchOperator() {
        require(msg.sender == batchOperator, 
        "Only the operator can perform this function");
        _;
    }

    //batch operator can be changed for whatever reason 
    function changeBatchOperator(address newOperator) public onlyBatchOperator{
        require(newOperator != address(0), "Invalid address");

        batchOperator = newOperator;
    }

    //Function to run the batch transactions
    function batchTransfer(address[] calldata addressesTo, uint256[] calldata amounts) external 
    onlyBatchOperator returns(bool success)
    {
        require(addressesTo.length == amounts.length, "Invalid input parameters");

        for(uint256 i = 0; i < addressesTo.length; i++) {
            require(addressesTo[i] != address(0), "Invalid Address");
            require(amounts[i] != 0, "You cant't trasnfer 0 tokens");
            require(addressesTo.length <= 200, "exceeds number of allowed addressess");
            require(amounts.length <= 200, "exceeds number of allowed amounts");
            
            require(transfer(addressesTo[i], amounts[i]), "Unable to transfer token to the account");
            
        }
        return true;
    }

    //Function for only the owner to check the remainig token after distribution
    function checkTokenBalance() public view onlyOwner returns(uint256)  {
        return balanceOf(msg.sender);
    }

    //Function to for the current user to check their balance
    function userBalance() public view returns(uint256) {
        return balanceOf(msg.sender);
    }
}