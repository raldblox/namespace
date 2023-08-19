// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "./interfaces/IBlockchainName.sol";
import "../interfaces/INamespaceRegistry.sol";
import "../../NamespaceGraphics/BlockchainNameOCVG.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/// @title Namespace Blockchain Names
/// @author raldblox.eth
/// @notice
/// @dev
contract BlockchainName is
    IBlockchainName,
    ERC721("Namespace Blockchain Name", "NAME"),
    Ownable2Step
{
    uint256 tokenIds;
    string chainNetwork;
    address registry;

    BlockchainNameOCVG private onchainvision;

    mapping(uint256 => string) names;
    mapping(uint256 => string) bgColors;
    mapping(uint256 => string) fontColors;

    constructor(string memory _chainNetwork, address _registry) {
        chainNetwork = _chainNetwork;
        registry = _registry;
        BlockchainNameOCVG onchainvision_ = new BlockchainNameOCVG(
            address(this),
            chainNetwork
        );
        onchainvision = onchainvision_;
    }

    function mint(
        address _receiver,
        string memory _name
    ) public returns (uint256) {
        uint256 newToken = tokenIds;
        _safeMint(_receiver, tokenIds);
        names[newToken] = _name;
        bgColors[newToken] = "white"; // @note default bgColor is white
        fontColors[newToken] = "#131313"; // @note default fontCcolor is darkgray
        tokenIds++;
        return newToken;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Nonexistent Token");

        string memory name_ = names[tokenId];
        string[] memory spaces_ = INamespaceRegistry(registry)
            .getSpacesConnectedToName(name_);
        string memory description_ = "";
        string memory image_ = onchainvision.generateImage(
            name_,
            tokenId,
            spaces_.length
        );
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

    function viewOCVG() public view returns (address) {
        return address(onchainvision);
    }

    function getNameByTokenId(
        uint256 tokenId
    ) external view returns (string memory) {
        return names[tokenId];
    }

    function getBgColorByTokenId(
        uint256 tokenId
    ) external view returns (string memory) {
        return bgColors[tokenId];
    }

    function getFontColorByTokenId(
        uint256 tokenId
    ) external view returns (string memory) {
        return fontColors[tokenId];
    }
}
