// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@zoociety/nifty-contracts/contracts/onchainvision/libraries/OCVG.sol";

contract BlockchainNameOCVG {
    function generateImage(
        string memory _name,
        uint256 _tokenId
    ) public view returns (string memory) {
        string memory content = generateDesign(_name, _tokenId);
        string memory ocvg = OCVG.init(500, "", content, "green");
        return OCVG.encode(ocvg);
    }

    function generateDesign(
        string memory _name,
        uint256 _tokenId
    ) public pure returns (string memory) {
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
            "CHAIN",
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
            "0 member/s",
            "",
            ""
        );

        string memory design = string(
            abi.encodePacked(tokenId, chain, name, member)
        );

        return design;
    }
}
