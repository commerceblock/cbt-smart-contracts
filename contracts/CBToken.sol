pragma solidity ^0.4.11;

//import './Ownable.sol';
import './MintableToken.sol';

contract CBToken is MintableToken {

    string public name = "CommerceBlock Token";
    string public symbol = "CBT";
    uint256 public decimals = 8;
}
