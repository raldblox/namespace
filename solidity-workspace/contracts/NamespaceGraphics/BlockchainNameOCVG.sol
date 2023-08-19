// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "../NamespaceCore/NamespaceToken/interfaces/IBlockchainName.sol";
import "@zoociety/nifty-contracts/contracts/onchainvision/libraries/OCVG.sol";

contract BlockchainNameOCVG {
    address public blockchainName;
    string chainNetwork;

    constructor(address _blockchainName, string memory _chainNetwork) {
        blockchainName = _blockchainName;
        chainNetwork = _chainNetwork;
    }

    function generateImage(
        string memory _name,
        uint256 _tokenId,
        uint256 _spacesCount
    ) public view returns (string memory) {
        string memory fontColor_ = IBlockchainName(blockchainName)
            .getFontColorByTokenId(_tokenId);
        string memory background = IBlockchainName(blockchainName)
            .getBgColorByTokenId(_tokenId);
        string memory content = generateDesign(
            _name,
            _tokenId,
            _spacesCount,
            fontColor_
        );

        string memory ocvg = OCVG.init(500, "", content, background);
        return OCVG.encode(ocvg);
    }

    function generateDesign(
        string memory _name,
        uint256 _tokenId,
        uint256 _spacesCount,
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

        string memory name = OCVG.text(
            250,
            270,
            55,
            "middle",
            "bold",
            _name,
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
                abi.encodePacked(Strings.toString(_spacesCount), " space/s")
            ),
            "",
            ""
        );

        string memory design = string(
            abi.encodePacked(style, tokenId, chain, name, member)
        );

        return design;
    }
}
