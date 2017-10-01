pragma solidity ^0.4.6;


import './StandardToken.sol';


/**
 * @title CommerceBlock ERC20 Token
 */
contract CommerceBlockToken is StandardToken {

    string public name = "CommerceBlock Token";
    string public symbol = "CBT";
    uint256 public decimals = 18;

    uint256 public supplyExponent = 9;
    uint256 public totalSupply = (10 ** supplyExponent) * (10 ** decimals);

    function CommerceBlockToken(address company) {
      balances[company] = totalSupply;
    }

}
