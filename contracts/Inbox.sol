// SPDX-License-Identifier: GPL-0.3

pragma solidity ^0.4.17;

// linter warnings (red underline) about pragma version can igonored!

// contract code will go here
contract Inbox {
    string public message;

    // older version constructor
    function Inbox(string memory _message) public {
        message = _message;
    }

    // since message state variable is public, by default it will have getter method.
    // function getMessage() public view returns (string) {
    //     return message;
    // }

    function setMessage(string memory _message) public {
        message = _message;
    }
}
