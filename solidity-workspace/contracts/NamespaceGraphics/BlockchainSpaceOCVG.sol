// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

// import "../NamespaceCore/interfaces/INamespaceRegistry.sol";
import "../NamespaceCore/NamespaceToken/interfaces/IBlockchainSpace.sol";
import "@zoociety/nifty-contracts/contracts/onchainvision/libraries/OCVG.sol";

contract BlockchainSpaceOCVG {
    address public blockchainSpace;
    string chainNetwork;

    constructor(address _blockchainSpace, string memory _chainNetwork) {
        blockchainSpace = _blockchainSpace;
        chainNetwork = _chainNetwork;
    }

    function generateImage(
        string memory _space,
        uint256 _tokenId,
        uint256 _membersCount
    ) public view returns (string memory) {
        string memory fontColor_ = "black";
        string memory background = "white";

        string memory content = generateDesign(
            _space,
            _tokenId,
            _membersCount,
            fontColor_
        );

        string memory ocvg = OCVG.init(500, "", content, background);
        return OCVG.encode(ocvg);
    }

    function generateDesign(
        string memory _space,
        uint256 _tokenId,
        uint256 _membersCount,
        string memory _fontColor
    ) public view returns (string memory) {
        string memory style = OCVG.style(
            string(
                abi.encodePacked(
                    "text {fill:",
                    _fontColor,
                    "; font-weight: bold; font-family: sans-serif;}"
                )
            ),
            ""
        );
        string memory tokenId = OCVG.text(
            480,
            50,
            30,
            "end",
            "bold",
            Strings.toString(_tokenId),
            "",
            ""
        );

        string memory chain = OCVG.text(
            20,
            50,
            30,
            "",
            "bold",
            chainNetwork,
            "",
            ""
        );

        string memory space = OCVG.text(
            250,
            270,
            55,
            "middle",
            "bold",
            string(abi.encodePacked(".", _space)),
            "",
            ""
        );

        string memory member = OCVG.text(
            250,
            470,
            20,
            "middle",
            "bold",
            string(
                abi.encodePacked(Strings.toString(_membersCount), " member/s")
            ),
            "",
            ""
        );

        string memory design = string(
            abi.encodePacked(style, tokenId, chain, space, member)
        );

        return design;
    }
}
