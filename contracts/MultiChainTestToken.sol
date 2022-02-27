// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MultiChainTestToken is ERC20("MultiChainTestToken","MCTT") {
    
    address admin;

    event TransferOutside(address indexed from, address indexed to, uint amount);
    event ReceiveOutside(address indexed from, address indexed to, uint amount);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "not admin");
        _;
    }

    function changeAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }

    function transferOutsideFrom(address from, address to, uint amount) external onlyAdmin {
        _spendAllowance(from, msg.sender, amount);
        _burn(from, amount);
        emit TransferOutside(from, to, amount);
    }

    function receiveOutside(address from, address to, uint amount ) external onlyAdmin {
        _mint(to, amount);
        emit ReceiveOutside(from, to, amount);
    }
}