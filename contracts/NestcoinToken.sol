//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NestcoinToken is ERC20 {

  constructor() ERC20("Nestcoin", "NXT") {
        _mint(msg.sender, 2000 * 10 **18);
    }
}
