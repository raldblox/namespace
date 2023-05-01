// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract Namespace {
    address admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not an admin");
        _;
    }

    function isAdmin() public view returns (bool) {
        return admin == msg.sender;
    }
}
