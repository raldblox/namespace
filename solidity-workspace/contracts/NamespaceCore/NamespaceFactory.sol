// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "./interfaces/INamespaceRegistry.sol";
import "../NamespaceGraphics/NamespaceOCVG.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/// @title Namespace Collection
/// @author raldblox.eth
/// @notice
/// @dev
contract NamespaceFactory is ERC721, Ownable2Step {
    address immutable registry;
    uint256 tokenIds;
    string spaceTld;

    mapping(uint256 => string) namespaces;
    mapping(uint256 => string) bgColors;
    mapping(uint256 => string) fontColors;

    constructor(
        string memory _name, // @note _SPACE Namespace Service
        string memory _spaceTld, // @note .TLD Space Domain
        address registryAddress
    ) ERC721(_name, "NAMESPACE") {
        registry = registryAddress;
        spaceTld = _spaceTld;
    }

    modifier onlyRegistry() {
        require(msg.sender == registry, "Only the registry can call this");
        _;
    }

    modifier TokenOwner(uint256 tokenId) {
        require(
            ownerOf(tokenId) == msg.sender,
            "Sender is not the token owner"
        );
        _;
    }

    function updateColors(
        uint256 tokenId,
        string memory _font,
        string memory _background
    ) public TokenOwner(tokenId) {
        fontColors[tokenId] = _font;
        bgColors[tokenId] = _background;
    }

    function mintNamespace(
        address _receiver,
        string memory _name
    ) public onlyRegistry returns (uint256) {
        uint256 newToken = tokenIds;
        string memory namespace_ = string(
            abi.encodePacked(_name, ".", spaceTld)
        );
        _safeMint(_receiver, newToken);
        namespaces[newToken] = namespace_;
        bgColors[newToken] = "white"; // @note default bgColor is white
        fontColors[newToken] = "#131313"; // @note default fontCcolor is darkgray
        tokenIds++;
        return newToken;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Nonexistent Token");

        address onchainvision = INamespaceRegistry(registry).viewOCVG();

        string memory name_ = namespaces[tokenId];
        string memory description_ = "";
        string memory image_ = NamespaceOCVG(onchainvision).generateImage(
            name_,
            tokenId,
            fontColors[tokenId],
            bgColors[tokenId]
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

    function getNamespaceByTokenId(
        uint256 tokenId
    ) external view returns (string memory) {
        return namespaces[tokenId];
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
