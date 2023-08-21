// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@zoociety/nifty-contracts/contracts/onchainvision/libraries/OCVG.sol";

contract NamespaceOCVG {
    address public namespaceFactory;
    string chainNetwork;

    constructor(string memory _chainNetwork) {
        chainNetwork = _chainNetwork;
    }

    function generateImage(
        string memory _name,
        uint256 _tokenId,
        string memory _fontColor,
        string memory _background
    ) public view returns (string memory) {
        string memory content = generateDesign(_name, _tokenId, _fontColor);
        string memory ocvg = OCVG.init(500, "", content, _background);
        return OCVG.encode(ocvg);
    }

    function generateDesign(
        string memory _name,
        uint256 _tokenId,
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

        string memory design = string(
            abi.encodePacked(style, tokenId, chain, name)
        );

        return design;
    }
}
