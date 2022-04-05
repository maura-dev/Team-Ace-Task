//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NestcoinToken is ERC20 {
  address private _owner;

  event Purchase (address indexed from,  uint256 value, string item);

  constructor() ERC20("Nestcoin", "NXT") {
        _mint(msg.sender, 2000 * 10 ** 18);
        _owner = msg.sender;
    }

  function purchase(uint256 amount, string memory item) public returns (bool) {
    transfer(_owner, amount);
    emit Purchase(msg.sender, amount, item);
    return true;
  }
}
