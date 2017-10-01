pragma solidity ^0.4.6;


import '../../contracts/BasicToken.sol';


// mock class using BasicToken
contract BasicTokenMock is BasicToken {

  function BasicTokenMock(address initialAccount, uint256 initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
