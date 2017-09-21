pragma solidity ^0.4.11;


import './StandardToken.sol';


/**
 * @title CommerceBlock ERC20 Token
 */
contract CBToken is StandardToken {

    string public name = "CommerceBlock Token";
    string public symbol = "CBT";
    uint256 public decimals = 18;

    uint256 public supplyExponent = 9;
    uint256 public totalSupply = (10 ** supplyExponent) * (10 ** decimals);

    function CBToken(address company) {
      balances[company] = totalSupply;
    }

}
