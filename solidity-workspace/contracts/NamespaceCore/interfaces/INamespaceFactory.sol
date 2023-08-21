// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

interface INamespaceFactory {
    function getNamespaceByTokenId(
        uint256 tokenId
    ) external view returns (string memory);

    function getBgColorByTokenId(
        uint256 tokenId
    ) external view returns (string memory);

    function getFontColorByTokenId(
        uint256 tokenId
    ) external view returns (string memory);
}
