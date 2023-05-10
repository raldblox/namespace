/**
 *
 * @title NAMESPACE TOKEN
 * @author raldblox.eth
 *
 */

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/IThemer.sol";
import "./interfaces/IVisualizer.sol";

interface INamespace {
    function hasSpace(
        string calldata _name,
        string calldata _space
    ) external returns (bool);

    function getSpaceNames(
        string calldata _name
    ) external view returns (string[] memory);

    function getNameSpaces(
        string calldata _name
    ) external view returns (string[] memory);

    function getSpaceInfo(
        string memory _space
    ) external view returns (string memory);

    function resolveName(string memory _name) external view returns (address);

    function resolveAddress(
        address owner
    ) external view returns (string memory);

    function getAllNames() external view returns (string[] memory);

    function getAllSpaces() external view returns (string[] memory);

    function getSpaces(
        string calldata _name
    ) external view returns (string memory);

    function getAttribute(
        string calldata _name
    ) external view returns (string memory);
}

contract NamespaceToken is ERC721, Ownable2Step {
    using SafeMath for uint256;
    uint256 public totalSupply;
    string private contractUri;
    address private admin;
    address public namespace;

    event NewToken(
        uint256 indexed tokenId,
        address indexed owner,
        string tokenType
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not an admin");
        _;
    }

    modifier onlyTokenizer() {
        require(msg.sender == namespace, "Caller is not the namespace");
        _;
    }

    IThemer private themer;
    IVisualizer private visualizer;

    mapping(uint256 => bool) isNames;
    mapping(uint256 => string) public names;
    mapping(uint256 => string) colors;
    mapping(uint256 => string) bgs;

    constructor() ERC721("Name Space Token", "NST") {
        admin = msg.sender; // deployer is the admin
        contractUri = '{"name":"namespace","description":"Connect, create, and control with Namespace."}';
    }

    function setContractUri(string memory _new) external onlyAdmin {
        contractUri = _new;
    }

    function isAdmin() internal view returns (bool) {
        return admin == msg.sender;
    }

    function isTokenizer() internal view returns (bool) {
        return namespace == msg.sender;
    }

    function setThemer(address _new) external onlyAdmin {
        themer = IThemer(_new);
    }

    function setVisualizer(address _new) external onlyAdmin {
        visualizer = IVisualizer(_new);
    }

    function setNamespace(address _new) external onlyAdmin {
        namespace = _new;
    }

    function setColor(
        uint256 tokenId,
        string memory color,
        string memory bg
    ) external onlyAdmin {
        if (!isAdmin()) {
            require(ownerOf(tokenId) == msg.sender);
        }
        colors[tokenId] = color;
        bgs[tokenId] = bg;
    }

    function mint(
        string memory _name,
        address _owner,
        bool isName
    ) public onlyTokenizer returns (uint256) {
        totalSupply++;
        _safeMint(_owner, totalSupply);
        isNames[totalSupply] = isName;
        names[totalSupply] = _name;
        emit NewToken(totalSupply, _owner, isName ? "Name" : "Space");
        return totalSupply;
    }

    function contractURI() external view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(bytes(abi.encodePacked(contractUri)))
                )
            );
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Nonexistent Token");

        string memory name_ = generateName(tokenId);
        string memory image_ = generateImage(tokenId);
        string memory attribute_ = generateAttribute(tokenId);
        string memory visualizer_ = generateVisualizer(tokenId);
        string memory description_ = isNames[tokenId]
            ? ""
            : INamespace(namespace).getSpaceInfo(names[tokenId]);

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

    function generateVisualizer(
        uint256 tokenId
    ) internal view returns (string memory) {
        string memory spaces = INamespace(namespace).getSpaces(names[tokenId]);
        return
            visualizer.generate(
                tokenId,
                names[tokenId],
                spaces,
                isNames[tokenId]
            );
    }

    function generateImage(
        uint256 tokenId
    ) public view returns (string memory) {
        bool isName = isNames[tokenId];

        string memory encodedBytes = Base64.encode(
            bytes(
                abi.encodePacked(
                    themer.encoder(),
                    themer.style(colors[tokenId], bgs[tokenId]),
                    themer.tokenID(tokenId),
                    themer.chainNetwork(),
                    themer.name(names[tokenId], isName),
                    themer.count(
                        (
                            isName
                                ? (
                                    INamespace(namespace).getNameSpaces(
                                        names[tokenId]
                                    )
                                ).length
                                : (
                                    INamespace(namespace).getSpaceNames(
                                        names[tokenId]
                                    )
                                ).length
                        ),
                        isName
                    ),
                    themer.format()
                )
            )
        );
        return string(abi.encodePacked(themer.prefix(), encodedBytes));
    }

    function generateAttribute(
        uint256 tokenId
    ) internal view returns (string memory) {
        return INamespace(namespace).getAttribute(names[tokenId]);
    }

    function generateName(
        uint256 tokenId
    ) internal view returns (string memory) {
        bool isName = isNames[tokenId];
        return string(abi.encodePacked(names[tokenId], isName ? "" : " space"));
    }

    function recover() external onlyOwner {
        uint256 amount = address(this).balance;
        (bool recovered, ) = admin.call{value: amount}("");
        require(recovered, "Failed to recover.");
    }
}
