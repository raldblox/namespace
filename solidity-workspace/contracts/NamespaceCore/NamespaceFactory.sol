// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/// @title Namespace Collection
/// @author raldblox.eth
/// @notice
/// @dev
contract NamespaceFactory is ERC721, Ownable2Step {
    uint256 tokenIds;
    address registry;

    constructor(
        string memory name,
        string memory symbol,
        address registryAddress
    ) ERC721(name, symbol) {
        registry = registryAddress;
    }

    function mintNamespace(
        address _receiver,
        string memory _name,
        string memory _space
    ) public returns (uint256) {
        uint256 newToken = tokenIds;
        _safeMint(_receiver, newToken);
        tokenIds++;
        return newToken;
    }
}
