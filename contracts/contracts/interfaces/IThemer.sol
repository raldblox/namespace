/**
 *
 * @title NFT THEMER
 * @author raldblox.eth
 *
 */

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

/**
 * @dev Interface of the Themer.
 */
interface IThemer {
    function version() external pure returns (string memory);

    function chainNetwork() external view returns (string memory);

    function tokenID(uint256) external pure returns (string memory);

    function style(
        string memory,
        string memory
    ) external pure returns (string memory);

    function name(string memory, bool) external pure returns (string memory);

    function count(uint256, bool) external pure returns (string memory);

    function encoder() external pure returns (string memory);

    function prefix() external pure returns (string memory);

    function format() external pure returns (string memory);

    function cover() external pure returns (string memory);

    function link() external pure returns (string memory);

    function contractURI() external pure returns (string memory);

    function attributeForName(
        string memory
    ) external view returns (string memory);

    function attributeForSpace(
        string memory,
        string memory,
        string memory,
        uint256,
        uint256
    ) external view returns (string memory);
}
