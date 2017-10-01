pragma solidity ^0.4.11;

import '../../contracts/BasicToken.sol';

contract BasicTokenMock is BasicToken {

  function BasicTokenMock(address initialAccount, uint256 initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
