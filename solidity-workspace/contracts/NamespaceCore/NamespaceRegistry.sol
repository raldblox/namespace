// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "./interfaces/INamespaceRegistry.sol";
import "./NamespaceFactory.sol";
import "./NamespaceToken/BlockchainName.sol";
import "./NamespaceToken/BlockchainSpace.sol";

/// @title Namespace Registry Core Contract
/// @author raldblox.eth
/// @notice Handle of all Name, Space, and Namespace Records
/// @dev The Namespace Storage Contract
contract NamespaceRegistry is INamespaceRegistry {
    address admin;
    BlockchainName public blockchainName;
    BlockchainSpace public blockchainSpace;

    struct Name {
        string[] names;
        mapping(string => address) creators;
        mapping(string => uint256) tokenIds; // @note TokenIDs of Blockchain Names
        mapping(string => string[]) connectedSpaces;
    }

    struct Space {
        string[] spaces;
        mapping(string => NamespaceFactory) factories;
        mapping(string => address) creators;
        mapping(string => uint256) tokenIds; // @note TokenIDs of Blockchain Spaces
        mapping(string => bool) isPrivate;
        mapping(string => string) spaceName;
        mapping(string => string) spaceDesc;
        mapping(string => string) spaceCover;
        mapping(string => string[]) spaceMember;
        mapping(string => uint256) membershipFees;
        mapping(string => mapping(address => bool)) isAllowed;
    }

    struct Namespace {
        string[] namespaces;
        mapping(string => address) creators;
        mapping(string => uint256) tokenIds; // @note TokenIDs of Blockchain Namespaces
        mapping(string => string[]) names;
        mapping(string => mapping(string => string)) textRecords; // subdomain
        mapping(string => mapping(string => uint256)) createdTokens; // subdomain
        mapping(string => mapping(address => bool)) isAllowed;
    }

    Name private name;
    Space private space;
    Namespace private namespace;

    event NameRegistered(string indexed _name, address indexed _creator);
    event SpaceRegistered(string indexed _space, address indexed _creator);
    event NamespaceCreated(string indexed _namespace, address indexed _creator);

    constructor(string memory _chainNetwork) {
        blockchainName = new BlockchainName(_chainNetwork, address(this));
        blockchainSpace = new BlockchainSpace();
    }

    modifier OnlyCreator(string memory name_) {
        require(
            name.creators[name_] == msg.sender,
            "Sender is not the creator"
        );
        _;
    }

    modifier OnlyNameOwner(string memory name_) {
        require(
            ERC721(blockchainName).ownerOf(name.tokenIds[name_]) == msg.sender,
            "Sender is not the creator"
        );
        _;
    }

    modifier OnlySpaceOwner(string memory name_) {
        require(
            ERC721(blockchainSpace).ownerOf(space.tokenIds[name_]) ==
                msg.sender,
            "Sender is not the creator"
        );
        _;
    }

    modifier NameNotTaken(string memory _name) {
        require(name.creators[_name] == address(0), "Name is already taken");
        _;
    }

    modifier SpaceNotTaken(string memory _space) {
        require(space.creators[_space] == address(0), "Space is already taken");
        _;
    }

    modifier NamespaceNotTaken(string memory _name, string memory _spaceTld) {
        string memory namespace_ = string(
            abi.encodePacked(_name, ".", _spaceTld)
        );
        require(
            namespace.creators[namespace_] == address(0),
            "Namespace is already taken"
        );
        _;
    }

    function registerName(string memory _name) public NameNotTaken(_name) {
        name.names.push(_name);
        name.creators[_name] = msg.sender;

        // mint name token
        uint256 newNameToken = blockchainName.mint(msg.sender, _name);
        name.tokenIds[_name] = newNameToken;

        emit NameRegistered(_name, msg.sender);
    }

    function registerSpace(
        string memory _spaceName,
        string memory _spaceTld
    ) public SpaceNotTaken(_spaceTld) returns (address) {
        space.spaces.push(_spaceTld);
        space.creators[_spaceTld] = msg.sender;

        // mint space token
        uint256 newSpaceToken = blockchainName.mint(msg.sender, _spaceName);

        // record tokenId to space records
        name.tokenIds[_spaceName] = newSpaceToken;

        // create namespace collection
        NamespaceFactory collection = new NamespaceFactory(
            string(abi.encodePacked(_spaceName, " Namespace Token")),
            string("NAMESPACE"),
            address(this)
        );

        // record collection address
        space.factories[_spaceTld] = collection;
        string memory namespace_ = string(
            abi.encodePacked(_spaceName, ".", _spaceTld)
        );

        // mint admin token in collection
        uint256 newNamespaceToken = NamespaceFactory(collection).mintNamespace(
            msg.sender,
            "admin",
            _spaceTld
        );

        // record tokenId to namespace records
        namespace.tokenIds[namespace_] = newNamespaceToken;

        // record namespace to registry
        namespace.namespaces.push(namespace_);
        emit SpaceRegistered(_spaceTld, msg.sender);
        return address(collection);
    }

    function createNamespace(
        string memory _name,
        string memory _spaceTld
    ) public NamespaceNotTaken(_name, _spaceTld) {
        require(
            ERC721(blockchainName).ownerOf(name.tokenIds[_name]) == msg.sender,
            "Sender is not the name owner"
        );

        uint256 newNamespaceToken = NamespaceFactory(space.factories[_spaceTld])
            .mintNamespace(msg.sender, _name, _spaceTld);

        string memory namespace_ = string(
            abi.encodePacked(_name, ".", _spaceTld)
        );

        namespace.namespaces.push(namespace_);

        // record tokenId to namespace records
        namespace.tokenIds[namespace_] = newNamespaceToken;
        namespace.creators[namespace_] = msg.sender;

        // Connect the space to the name
        name.connectedSpaces[_name].push(_spaceTld);

        emit NamespaceCreated(namespace_, msg.sender);
    }

    function updateSpace(
        string memory _space,
        string memory _spaceCover,
        string memory _spaceName,
        string memory _spaceDesc,
        bool _isPrivate
    ) public OnlySpaceOwner(_space) {
        space.spaceCover[_space] = _spaceCover;
        space.spaceName[_space] = _spaceName;
        space.spaceDesc[_space] = _spaceDesc;
        space.isPrivate[_space] = _isPrivate;
    }

    function getNameCreators(
        string memory _name
    ) public view returns (address) {
        return name.creators[_name];
    }

    function getSpaceCreators(
        string memory _space
    ) public view returns (address) {
        return space.creators[_space];
    }

    function getNamespaceCreators(
        string memory _name,
        string memory _space
    ) public view returns (address) {
        string memory namespace_ = string(abi.encodePacked(_name, ".", _space));
        return namespace.creators[namespace_];
    }

    function getNameTokenId(string memory _name) public view returns (uint256) {
        return name.tokenIds[_name];
    }

    function getSpaceTokenId(
        string memory _space
    ) public view returns (uint256) {
        return name.tokenIds[_space];
    }

    function getNamespaceTokenId(
        string memory _name,
        string memory _space
    ) public view returns (uint256) {
        string memory namespace_ = string(abi.encodePacked(_name, ".", _space));
        return namespace.tokenIds[namespace_];
    }

    function getNamespaceFactory(
        string memory _space
    ) public view returns (address) {
        return address(space.factories[_space]);
    }

    function getSpaceDetails(
        string memory _space
    )
        public
        view
        returns (bool isPrivate, string memory description, string memory cover)
    {
        isPrivate = space.isPrivate[_space];
        description = space.spaceDesc[_space];
        cover = space.spaceCover[_space];
    }

    function getSpacesConnectedToName(
        string memory _name
    ) external view returns (string[] memory) {
        return name.connectedSpaces[_name];
    }

    function viewBlockchainName() external view returns (address) {
        return address(blockchainName);
    }

    function viewBlockchainSpace() external view returns (address) {
        return address(blockchainSpace);
    }

    function viewNameTokenURI(
        uint256 tokenId
    ) external view returns (string memory) {
        return BlockchainName(blockchainName).tokenURI(tokenId);
    }
}
