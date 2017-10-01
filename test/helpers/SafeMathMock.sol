pragma solidity ^0.4.6;


import '../../contracts/SafeMath.sol';


contract SafeMathMock {
  uint256 public result;

  function subtract(uint256 a, uint256 b) {
    result = SafeMath.sub(a, b);
  }

  function add(uint256 a, uint256 b) {
    result = SafeMath.add(a, b);
  }
}
