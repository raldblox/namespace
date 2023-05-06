// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

interface INamespace {
    function updateSpace(
        string calldata _space,
        string calldata _orgname,
        string calldata _description
    ) external payable;

    function createName(string calldata _name) external payable returns (bool);

    function createSpace(
        string calldata _space,
        string calldata _orgname,
        string calldata _description
    ) external payable returns (bool);

    function createNamespace(
        string calldata _name,
        string calldata _space
    ) external payable;

    function connectSpace(
        string calldata _name,
        string calldata _space
    ) external payable;

    function addLink(
        string calldata _name,
        string calldata _space,
        string calldata _link,
        bool isName
    ) external payable;

    function hasSpace(
        string calldata _name,
        string calldata _space
    ) external returns (bool);

    function getTokenIds(string memory _name) external view returns (uint256);

    function getSpaceNames(
        string calldata _name
    ) external view returns (string[] memory);

    function getSpaces(
        string calldata _name
    ) external view returns (string memory);

    function getAttribute(
        string calldata _name
    ) external view returns (string memory);

    function getNameSpaces(
        string calldata _name
    ) external view returns (string[] memory);

    function getSpaceInfos(
        string memory _space
    ) external view returns (string memory);

    function resolveName(string memory _name) external view returns (address);

    function resolveNamespace(
        string memory _name,
        string memory _space
    ) external view returns (address);

    function resolveAddress(
        address owner
    ) external view returns (string memory);

    function getAllNames() external view returns (string[] memory);

    function getAllSpaces() external view returns (string[] memory);

    function getAllLinks(
        address owner,
        string memory _namespace,
        bool isName
    ) external view returns (string[] memory);
}
