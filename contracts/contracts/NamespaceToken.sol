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

    function getSpaceInfos(
        string memory _space
    ) external view returns (string memory, string memory);

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

contract NamespaceToken is ERC721 {
    using SafeMath for uint256;
    bool reentrancyLock = false;
    uint256 public totalSupply;
    address admin;
    address owner;

    event NewToken(
        uint256 indexed tokenId,
        address indexed owner,
        string tokenType
    );

    modifier noReentrant() {
        require(!reentrancyLock, "Badgify: no reentrant");
        reentrancyLock = true;
        _;
        reentrancyLock = false;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not an admin");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not an admin");
        _;
    }

    IThemer private themer;
    IVisualizer private visualizer;
    INamespace private namespace;

    mapping(uint256 => bool) isNames;
    mapping(uint256 => string) public names;
    mapping(uint256 => string) colors;
    mapping(uint256 => string) bgs;

    constructor(address _owner) ERC721("NameSpace Token", "NST") {
        owner = _owner; // deployer of contract is the owner
        admin = msg.sender; // contract is the admin
    }

    function isAdmin() public view returns (bool) {
        return admin == msg.sender;
    }

    function isOwner() public view returns (bool) {
        return owner == msg.sender;
    }

    function setThemer(address _new) external onlyOwner {
        themer = IThemer(_new);
    }

    function setNamespace(address _new) external onlyOwner {
        namespace = INamespace(_new);
    }

    function setVisualizer(address _new) external onlyOwner {
        visualizer = IVisualizer(_new);
    }

    function mint(
        string memory _name,
        address _owner,
        bool isName
    ) public onlyAdmin returns (uint256) {
        totalSupply++;
        _safeMint(_owner, totalSupply);
        isNames[totalSupply] = isName;
        names[totalSupply] = _name;
        emit NewToken(totalSupply, _owner, isName ? "Name" : "Space");
        return totalSupply;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(tokenId), "BADGIFY: Nonexistent Token");

        string memory name_ = generateName(tokenId);
        string memory image_ = generateImage(tokenId);
        string memory attribute_ = generateAttribute(tokenId);
        string memory visualizer_ = generateVisualizer(tokenId);
        string memory description_ = "";

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
    ) public view returns (string memory) {
        string memory spaces = INamespace(admin).getSpaces(names[tokenId]);
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
                    themer.name(names[tokenId]),
                    themer.count(
                        (
                            isName
                                ? (
                                    INamespace(admin).getNameSpaces(
                                        names[tokenId]
                                    )
                                ).length
                                : (
                                    INamespace(admin).getSpaceNames(
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
        return INamespace(admin).getAttribute(names[tokenId]);
    }

    function generateName(uint256 tokenId) public view returns (string memory) {
        bool isName = isNames[tokenId];
        return string(abi.encodePacked(names[tokenId], isName ? "" : " space"));
    }
}
