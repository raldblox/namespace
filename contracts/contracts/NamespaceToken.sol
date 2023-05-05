// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NamespaceToken is ERC721 {
    using SafeMath for uint256;
    bool reentrancyLock = false;
    uint256 public totalSupply;
    address admin;

    event NewToken(
        uint256 indexed tokenId,
        address indexed owner,
        string tokenType,
        string symbol
    );

    modifier noReentrant() {
        require(!reentrancyLock, "Badgify: no reentrant");
        reentrancyLock = true;
        _;
        reentrancyLock = false;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not an admin");
        _;
    }

    constructor() ERC721("NameSpace Token", "NST") {
        admin = msg.sender;
    }

    function isAdmin() public view returns (bool) {
        return admin == msg.sender;
    }

    function mint(
        address owner,
        bool isName
    ) public onlyAdmin returns (uint256) {
        totalSupply++;
        _safeMint(owner, totalSupply);
        emit NewToken(totalSupply, owner, isName ? "" : "", "");
        return totalSupply;
    }
}
