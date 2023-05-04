// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "./NameStorage.sol";
import "./SpaceStorage.sol";

contract Namespace {
    address admin;

    struct Name {
        string[] names;
        mapping(string => address) ownerOf;
        mapping(string => string[]) spaces;
        mapping(address => string[]) links;
        mapping(address => string[]) files;
    }

    struct Space {
        string[] spaces;
        mapping(string => address) ownerOf;
        mapping(string => string[]) names;
        mapping(string => string[]) links;
        mapping(string => string[]) files;
    }

    Name private name;
    Space private space;

    NameStorage private nameStorage;
    SpaceStorage private spaceStorage;

    constructor() {
        admin = msg.sender;
        nameStorage = new NameStorage();
        spaceStorage = new SpaceStorage();
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not an admin");
        _;
    }

    function isAdmin() public view returns (bool) {
        return admin == msg.sender;
    }

    function createName(string calldata _name) public {
        require(name.ownerOf[_name] == address(0));
        name.names.push(_name);
        name.ownerOf[_name] = msg.sender;
    }

    function createSpace(string calldata _space) public {
        require(space.ownerOf[_space] == address(0));
        space.ownerOf[_space] = msg.sender;
    }

    function connectSpace(
        string calldata _name,
        string calldata _space
    ) public {
        require(
            (name.ownerOf[_name] == msg.sender) ||
                (name.ownerOf[_space] == msg.sender)
        );
        name.spaces[_name].push(_space);
        space.names[_name].push(_name);
    }

    function getOwnerOfName(
        string calldata _name
    ) public view returns (address) {
        return name.ownerOf[_name];
    }

    function getOwnerOfSpace(
        string calldata _space
    ) public view returns (address) {
        return space.ownerOf[_space];
    }

    function getNameSpaces(
        string calldata _name
    ) public view returns (string[] memory) {
        return name.spaces[_name];
    }

    function getSpaceNames(
        string calldata _name
    ) public view returns (string[] memory) {
        return space.names[_name];
    }
}
