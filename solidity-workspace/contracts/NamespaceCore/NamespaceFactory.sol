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

    function createNamespace(
        address _receiver,
        string memory _name,
        string memory _space
    ) public returns (string memory) {
        _safeMint(_receiver, tokenIds);
        tokenIds++;

        return string(abi.encodePacked(_name, ".", _space));
    }
}
