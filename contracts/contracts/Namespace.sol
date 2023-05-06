// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "./NamespaceToken.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Namespace is INamespace {
    using SafeMath for uint256;
    address admin;
    uint256 private nameFee;
    uint256 private spaceFee;
    uint256 private connectFee;

    struct Name {
        string[] names;
        mapping(string => address) creator;
        mapping(string => uint256) tokenIds;
        mapping(string => string[]) spaces;
        mapping(address => mapping(string => string[])) links; // @note map address to name.space to links
        mapping(address => mapping(string => address[])) wallets; // @note map address to name.space to links
    }

    struct Space {
        string[] spaces;
        mapping(string => address) creator;
        mapping(string => string) orgnames;
        mapping(string => string) orglogos;
        mapping(string => uint256) tokenIds;
        mapping(string => string) description;
        mapping(string => string[]) names;
        mapping(string => string[]) links;
        mapping(string => uint256) membershipFees;
    }

    Name private name;
    Space private space;

    NamespaceToken private token;

    mapping(address => string) primaryNames;
    mapping(string => bool) isNames;

    constructor() {
        admin = msg.sender;
        token = new NamespaceToken(msg.sender);
        setFees(1 ether, 1 ether, 1 ether);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not an admin");
        _;
    }

    function setFees(
        uint256 _name,
        uint256 _space,
        uint256 _connect
    ) public onlyAdmin {
        nameFee = _name;
        spaceFee = _space;
        connectFee = _connect;
    }

    function setMembershipFee(
        string calldata _space,
        uint256 fee
    ) public payable {
        require(space.creator[_space] == msg.sender, "Not Authorized");
        space.membershipFees[_space] = fee;
    }

    function setPrimary(string memory _name) public {
        require(
            token.ownerOf(name.tokenIds[_name]) == msg.sender,
            "You do not own this name"
        );
        primaryNames[msg.sender] = _name;
        if (token.ownerOf(name.tokenIds[_name]) != name.creator[_name]) {
            if (
                keccak256(bytes(primaryNames[name.creator[_name]])) ==
                keccak256(bytes(_name))
            ) {
                primaryNames[name.creator[_name]] = "";
            }
        }
    }

    function isAdmin() public view returns (bool) {
        return admin == msg.sender;
    }

    function updateSpace(
        string memory _space,
        string calldata _orgname,
        string calldata _description
    ) public payable {
        if (!isAdmin()) {
            uint256 tokenId = space.tokenIds[_space];
            require(token.ownerOf(tokenId) == msg.sender, "Not authorized");
        }
        space.orgnames[_space] = _orgname;
        space.description[_space] = _description;
    }

    function updateLogo(
        string calldata _space,
        string calldata _logo
    ) public payable {
        if (!isAdmin()) {
            uint256 tokenId = space.tokenIds[_space];
            require(token.ownerOf(tokenId) == msg.sender, "Not authorized");
        }
        space.orglogos[_space] = _logo;
    }

    function createName(
        string calldata _name,
        address _owner
    ) public payable returns (bool) {
        require(name.creator[_name] == address(0));
        if (!isAdmin()) {
            require(msg.value >= nameFee, "Name creation fee not met");
        }
        uint256 tokenId = token.mint(_name, _owner, true);
        name.tokenIds[_name] = tokenId;
        name.names.push(_name);
        name.creator[_name] = _owner;
        isNames[_name] = true;
        setPrimary(_name);
        return true;
    }

    function createSpace(
        address _owner,
        string calldata _space,
        string calldata _orgname,
        string calldata _description,
        string calldata _logo
    ) public payable returns (bool) {
        require(space.creator[_space] == address(0), "Space already taken");
        if (!isAdmin()) {
            require(msg.value >= spaceFee, "Space creation fee not met");
        }
        uint256 tokenId = token.mint(_space, _owner, false);
        isNames[_space] = false;
        space.tokenIds[_space] = tokenId;
        space.spaces.push(_space);
        space.creator[_space] = _owner;
        space.orglogos[_space] = _logo;
        space.orgnames[_space] = _orgname;
        space.description[_space] = _description;
        return true;
    }

    function createNamespace(
        address _owner,
        string calldata _name,
        string calldata _space
    ) public payable {
        require(name.creator[_name] == address(0), "Name already taken.");
        require(space.creator[_space] != address(0), "Space doesn't exist");
        if (!isAdmin()) {
            uint256 totalFees = connectFee
                .add(space.membershipFees[_space])
                .add(nameFee);
            require(msg.value >= totalFees, "Total fees not met.");
            bool success = createName(_name, _owner);
            require(success, "Failed to create name");
        }
        connectSpace(_name, _space);
    }

    function connectSpace(
        string calldata _name,
        string calldata _space
    ) public payable {
        require(space.creator[_space] != address(0), "Space doesn't exist");
        require(name.creator[_name] != address(0), "Name doesn't exist");
        require(
            (name.creator[_name] == msg.sender) ||
                (space.creator[_space] == msg.sender),
            "Not authorized"
        );
        if (!isAdmin()) {
            require(
                msg.value >= (connectFee.add(space.membershipFees[_space])),
                "Connection fees not met"
            );
            (bool sent, ) = space.creator[_space].call{
                value: space.membershipFees[_space]
            }("");
            require(sent, "Failed to send membership fee");
        }
        name.spaces[_name].push(_space);
        space.names[_space].push(_name);
    }

    function addLink(
        string calldata _name,
        string calldata _space,
        string memory _link,
        bool isName
    ) public payable {
        address linkOwner;
        if (isName) {
            require(name.creator[_name] != address(0), "Name doesn't exist");
            linkOwner = token.ownerOf(name.tokenIds[_name]);
            require(hasSpace(_name, _space), "Name doesn't own this space");
            name.links[linkOwner][_space].push(_link);
        } else {
            require(space.creator[_space] != address(0), "Space doesn't exist");
            space.links[_space].push(_link);
        }
    }

    function hasSpace(
        string calldata _name,
        string calldata _space
    ) public view returns (bool) {
        bool foundSpace = false;
        for (uint i = 0; i < name.spaces[_name].length; i++) {
            if (
                keccak256(bytes(name.spaces[_name][i])) ==
                keccak256(bytes(_space))
            ) {
                foundSpace = true;
                break;
            }
        }
        return foundSpace;
    }

    function getNameCreator(
        string calldata _name
    ) public view returns (address) {
        return name.creator[_name];
    }

    function getSpaceCreator(
        string calldata _space
    ) public view returns (address) {
        return space.creator[_space];
    }

    function getNameSpaces(
        string memory _name
    ) public view returns (string[] memory) {
        return name.spaces[_name];
    }

    function getSpaceNames(
        string memory _name
    ) public view returns (string[] memory) {
        return space.names[_name];
    }

    function getAllNames() public view returns (string[] memory) {
        return name.names;
    }

    function getAllSpaces() public view returns (string[] memory) {
        return space.spaces;
    }

    function getAllLinks(
        address owner,
        string memory _namespace,
        bool isName
    ) public view returns (string[] memory) {
        if (isName) {
            return name.links[owner][_namespace];
        } else {
            return space.links[_namespace];
        }
    }

    function getTokenIds(string memory _name) public view returns (uint256) {
        return name.tokenIds[_name];
    }

    function getSpaceInfos(
        string memory _space
    ) public view returns (string memory, string memory) {
        return (space.orgnames[_space], space.description[_space]);
    }

    function getSpaces(
        string calldata _name
    ) public view returns (string memory) {
        string[] memory spaceNames;
        bool isName = isNames[_name];
        string memory spacesJson = "[";
        string memory spaceJson;
        if (isName) {
            spaceNames = getNameSpaces(_name);
            for (uint256 i = 0; i < spaceNames.length; i++) {
                string memory spaceName = spaceNames[i];
                string memory logo = space.orglogos[spaceName];
                logo = space.orglogos[spaceName];

                spaceJson = string(
                    abi.encodePacked(
                        '{"name":"',
                        spaceName,
                        '", "backgroundImage":"',
                        logo,
                        '"}'
                    )
                );
                spacesJson = string(
                    abi.encodePacked(
                        spacesJson,
                        spaceJson,
                        i == spaceNames.length - 1 ? "" : ","
                    )
                );
            }
        } else {
            spaceJson = string(
                abi.encodePacked(
                    '{"name":"',
                    _name,
                    '", "backgroundImage":"',
                    space.orglogos[_name],
                    '"}'
                )
            );
            spacesJson = string(abi.encodePacked(spacesJson, spaceJson));
        }

        spacesJson = string(abi.encodePacked(spacesJson, "]"));

        return spacesJson;
    }

    function getAttribute(
        string memory name_
    ) public view returns (string memory) {
        bool isName = isNames[name_];
        if (isName) {
            return
                string(
                    abi.encodePacked(
                        '{"trait_type": "TokenType", "value": "Name"},{"trait_type": "Connected Spaces", "value": "',
                        isName
                            ? Strings.toString((name.spaces[name_]).length)
                            : "",
                        '"}'
                    )
                );
        } else {
            string memory member = Strings.toString(
                (getSpaceNames(name_).length)
            );
            return
                string(
                    abi.encodePacked(
                        '{"trait_type": "Token Type", "value": "Space"},{"trait_type": "Space Description", "value": "',
                        space.description[name_],
                        '"},{"trait_type": "Space Name", "value": "',
                        space.orgnames[name_],
                        '"},{"trait_type": "Membership Fee", "value": "',
                        Strings.toString(space.membershipFees[name_]),
                        '"},{"trait_type": "Members Count", "value": "',
                        member,
                        '"}'
                    )
                );
        }
    }

    function resolveName(string memory _name) public view returns (address) {
        return token.ownerOf(name.tokenIds[_name]);
    }

    function resolveAddress(address owner) public view returns (string memory) {
        return primaryNames[owner];
    }

    function tokenSupply() public view returns (uint256) {
        return token.totalSupply();
    }

    function tokenAddress() public view returns (address) {
        return address(token);
    }

    function authorized() public view returns (address) {
        return address(token);
    }
}
