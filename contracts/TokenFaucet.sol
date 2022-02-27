// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface Token {
    function balanceOf(address account) external view returns (uint256);
    function decimals() external view returns(uint8);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract TokenFaucet {
    Token token;
    mapping(address=>uint256) public latestWithdrawal;

    function getTokens(address token_, uint amount) external {
        require(amount <= 50, "amount should be <= 50");
        require(block.timestamp >= latestWithdrawal[msg.sender] + 1 days, "less than 1 day since last withdrawal");

        token = Token(token_);
        uint balance = token.balanceOf(address(this));
        require(balance >= amount, "insufficient balance");

        uint8 decimals = token.decimals();
        latestWithdrawal[msg.sender] = block.timestamp;
        token.transfer(msg.sender, amount * (10 ** decimals));
    }
}