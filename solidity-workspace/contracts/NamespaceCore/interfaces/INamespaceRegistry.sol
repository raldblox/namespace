// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

interface INamespaceRegistry {
    function registerName(
        address _receiver,
        string memory _name
    ) external payable;

    function registerSpace(
        address _receiver,
        string memory _spaceName,
        string memory _spaceTld
    ) external payable returns (address);

    function createNamespace(
        address _receiver,
        string memory _name,
        string memory _spaceTld
    ) external payable;

    function viewOCVG() external view returns (address);

    function viewBlockchainName() external view returns (address);

    function viewBlockchainSpace() external view returns (address);

    function getSpacesConnectedToName(
        string memory _name
    ) external view returns (string[] memory);

    function getNamesConnectedToSpace(
        string memory _space
    ) external view returns (string[] memory);
}
