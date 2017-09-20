pragma solidity ^0.4.11;

//import './Ownable.sol';
import './MintableToken.sol';

contract CBToken is StandardToken {

    string public name = "CommerceBlock Token";
    string public symbol = "CBT";
    uint256 public decimals = 8;

    function CBToken(address company){
        totalSupply = 1000000000;
        balances[company] =1000000000;
    }
}


