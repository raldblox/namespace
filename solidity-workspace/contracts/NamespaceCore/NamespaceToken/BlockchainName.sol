// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "../../NamespaceGraphics/BlockchainNameOCVG.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/// @title Namespace Blockchain Names
/// @author raldblox.eth
/// @notice
/// @dev
contract BlockchainName is
    ERC721("Namespace Blockchain Name", "NAME"),
    Ownable2Step
{
    uint256 tokenIds;

    BlockchainNameOCVG private onchainvision;

    mapping(uint256 => string) names;

    constructor() {
        BlockchainNameOCVG onchainvision_ = new BlockchainNameOCVG();
        onchainvision = onchainvision_;
    }

    function mint(
        address _receiver,
        string memory _name
    ) public returns (uint256) {
        uint256 newToken = tokenIds;
        _safeMint(_receiver, tokenIds);
        names[newToken] = _name;
        tokenIds++;
        return newToken;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Nonexistent Token");

        string memory name_ = names[tokenId];
        string memory image_ = onchainvision.generateImage(name_);
        string memory attribute_ = "";
        string memory visualizer_ = "";

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                name_,
                                '", "description":"',
                                description_,
                                '", "image": "',
                                image_,
                                '", "attributes": ',
                                "[",
                                attribute_,
                                "]",
                                ', "animation_url": "',
                                visualizer_,
                                '"}'
                            )
                        )
                    )
                )
            );
    }
}
