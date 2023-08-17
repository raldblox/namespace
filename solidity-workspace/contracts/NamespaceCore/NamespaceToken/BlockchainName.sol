// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/// @title Namespace Blockchain Names
/// @author raldblox.eth
/// @notice
/// @dev
contract BlockchainName is ERC721("Namespace Blockchain Name", "NAME"), Ownable2Step {
    uint256 tokenIds;

    constructor() {}

    function mint(address _receiver) public {
        _safeMint(_receiver, tokenIds);
        tokenIds++;
    }
}
