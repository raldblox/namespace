// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@zoociety/nifty-contracts/contracts/onchainvision/libraries/OCVG.sol";

contract BlockchainNameOCVG {
    function generateImage(string memory _name) public returns (string memory) {
        return "Hello, Zoociety";
    }
}
