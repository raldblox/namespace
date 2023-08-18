// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/// @title Namespace Blockchain Spaces
/// @author raldblox.eth
/// @notice
/// @dev
contract BlockchainSpace is
    ERC721("Namespace: Blockchain Space", "SPACE"),
    Ownable2Step
{
    uint256 tokenIds;

    constructor() {}

    function mint(
        address _receiver,
        string memory _space
    ) public returns (uint256) {
        uint256 newToken = tokenIds;
        _safeMint(_receiver, tokenIds);
        tokenIds++;
        return newToken;
    }
}
