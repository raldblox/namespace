// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "./NamespaceFactory.sol";
import "./NamespaceToken/BlockchainName.sol";
import "./NamespaceToken/BlockchainSpace.sol";

/// @title Namespace Registry Core Contract
/// @author raldblox.eth
/// @notice Handles of all Namespace Records
/// @dev The Namespace Storage Contract
contract NamespaceRegistry {
    address admin;
    BlockchainName public blockchainName;
    BlockchainSpace public blockchainSpace;

    struct Name {
        string[] names;
        mapping(string => address) creators;
        mapping(string => uint256) nameIds; // @note TokenIDs of Blockchain Names
        mapping(string => string[]) blockchainSpaces;
        mapping(string => mapping(string => uint256[])) namespaceLinks; // @note mappin name.space to links to LinkID
        mapping(string => mapping(string => address)) walletAddresses; // @note map address to name to space to addresses
    }

    struct Space {
        string[] spaces;
        mapping(string => NamespaceFactory) collections;
        mapping(string => address) creators;
        mapping(string => address) collectionAddresses;
        mapping(string => uint256) spaceIds; // @note TokenIDs of Blockchain Spaces
        mapping(string => string[]) spaceMembers;
        mapping(string => bool) isPrivate;
        mapping(string => string) spaceName;
        mapping(string => string[]) names;
        mapping(string => string[]) links;
        mapping(string => uint256) membershipFees;
        mapping(string => mapping(address => bool)) isAllowed;
    }

    struct Namespace {
        string[] namespaces;
        mapping(string => address) creators;
        mapping(string => uint256) namespaceIds; // @note TokenIDs of Blockchain Namespaces
        mapping(string => string[]) names;
        mapping(string => mapping(string => string)) textRecords; // subdomain
        mapping(string => mapping(string => uint256)) createdTokens; // subdomain
        mapping(string => mapping(address => bool)) isAllowed;
    }

    Name private name;
    Space private space;
    Namespace private namespace;

    constructor() {
        blockchainName = new BlockchainName();
        blockchainSpace = new BlockchainSpace();
    }

    modifier NameNotTaken(string memory _name) {
        require(name.creators[_name] == address(0), "Name is already taken");
        _;
    }

    modifier SpaceNotTaken(string memory _space) {
        require(space.creators[_space] == address(0), "Space is already taken");
        _;
    }

    modifier NamespaceNotTaken(string memory _name, string memory _space) {
        string memory namespace_ = string(abi.encodePacked(_name, ".", _space));
        require(
            namespace.creators[namespace_] == address(0),
            "Namespace is already taken"
        );
        _;
    }

    function registerName(string memory _name) public NameNotTaken(_name) {
        name.names.push(_name);
        name.creators[_name] = msg.sender;
    }

    function registerSpace(
        string memory _space,
        string memory _symbol
    ) public SpaceNotTaken(_space) returns (address) {
        space.spaces.push(_space);
        space.creators[_space] = msg.sender;
        // create namespace collection
        NamespaceFactory collection = new NamespaceFactory(
            string(abi.encodePacked(_space, " Namespace Token")),
            string("NAMESPACE"),
            address(this)
        );
        // record collection address
        space.collections[_space] = collection;
        // mint admin token in collection
        string memory newNamespace = NamespaceFactory(collection)
            .createNamespace(msg.sender, "admin", _symbol);
        // record namespace to registry
        namespace.namespaces.push(newNamespace);
        return address(collection);
    }

    function createNamespace(
        string memory _name,
        string memory _space
    ) public NamespaceNotTaken(_name, _space) {
        string memory namespace_ = string(abi.encodePacked(_name, ".", _space));
        namespace.creators[namespace_] = msg.sender;
    }

    function linkTextRecords() public {}

    function linkAddresses() public {}
}
