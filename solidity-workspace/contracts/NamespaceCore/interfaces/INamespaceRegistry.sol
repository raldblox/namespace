// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

interface INamespaceRegistry {
    function viewBlockchainName() external view returns (address);

    function viewBlockchainSpace() external view returns (address);

    function getSpacesConnectedToName(
        string memory _name
    ) external view returns (string[] memory);
}
