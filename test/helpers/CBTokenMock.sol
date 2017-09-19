pragma solidity ^0.4.11;


import '../../contracts/CBToken.sol';


// mock class using StandardToken
contract CBTokenMock is CBToken {

  function CBTokenMock(address initialAccount, uint256 initialBalance) {
    balances[initialAccount] = initialBalance;
    totalSupply = initialBalance;
  }

}
