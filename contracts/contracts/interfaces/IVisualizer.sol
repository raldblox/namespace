/**
 *
 * @title NFT VISUALIZER
 * @author raldblox.eth
 *
 */

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

/**
 * @dev Interface of the BadgifyVisualizer.
 */
interface IVisualizer {
    function version() external pure returns (string memory);

    function generate(
        uint256,
        string memory,
        string memory,
        bool
    ) external view returns (string memory);
}
