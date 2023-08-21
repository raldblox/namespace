// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "./interfaces/IBlockchainName.sol";
import "../interfaces/INamespaceRegistry.sol";
import "../../NamespaceGraphics/BlockchainNameOCVG.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/// @title Namespace: Blockchain Names
/// @author raldblox.eth
contract BlockchainName is
    IBlockchainName,
    ERC721("Namespace: Blockchain Name", "NAME"),
    Ownable2Step
{
    address immutable registry;
    string chainNetwork;
    uint256 tokenIds;
    address admin;

    BlockchainNameOCVG private onchainvision;

    mapping(uint256 => string) names;
    mapping(uint256 => string) bgColors;
    mapping(uint256 => string) fontColors;

    constructor(
        string memory _chainNetwork,
        address _registry,
        address _admin
    ) {
        chainNetwork = _chainNetwork;
        registry = _registry;
        admin = _admin;
    }

    modifier TokenOwner(uint256 tokenId) {
        require(
            ownerOf(tokenId) == msg.sender,
            "Sender is not the token owner"
        );
        _;
    }

    modifier OnlyRegistry() {
        require(
            registry == msg.sender,
            "Sender is not the Namespace Registry Contract"
        );
        _;
    }

    function mint(
        address _receiver,
        string memory _name
    ) public OnlyRegistry returns (uint256) {
        uint256 newToken = tokenIds;
        _safeMint(_receiver, tokenIds);
        names[newToken] = _name;
        bgColors[newToken] = "white"; // @note default bgColor is white
        fontColors[newToken] = "#131313"; // @note default fontCcolor is darkgray
        tokenIds++;
        return newToken;
    }

    function updateColors(
        uint256 tokenId,
        string memory _font,
        string memory _background
    ) public TokenOwner(tokenId) {
        fontColors[tokenId] = _font;
        bgColors[tokenId] = _background;
    }

    function updateOCVG(address _newOCVG) public {
        require(admin == msg.sender);
        BlockchainNameOCVG onchainvision_ = BlockchainNameOCVG(_newOCVG);
        onchainvision = onchainvision_;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Non-existent Token");

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
