pragma solidity ^0.4.11;
import './CBToken.sol';
import './Ownable.sol';
import './MintableToken.sol';



contract Fund is Ownable {

    CBToken public tokenFund;

    uint public totalSupply = 1000000000; // 1 billion ;
    uint public tokensIssued = 0;


    uint public companyTokens = 300000000; // 300 million ;
    uint public partnersTokens = 300000000; // 300 million ;
    address private remaining;

    event TokenPurchase(address indexed purchaser, uint256 amount , uint256 remainingTokens);

    bool public isFinalized = false;
    bool public isInProgress = false;


    event Finalized();
    event Started();
    event Ended();


    function issueTokens(address _for, uint tokenCount) external onlyOwner
    returns (bool)
    {
        require(inProgress());
        if (tokenCount == 0) {
            return false;
        }
        if(!validPurchase(tokenCount)) {
            return false;
        }
        tokenFund.mint(_for,tokenCount);
         tokensIssued += tokenCount;
        TokenPurchase(_for,tokenCount,totalSupply-tokensIssued);
         return true;
    }

    function Fund( address company , address partners ,address _remaining) {

        tokenFund = new CBToken();
        remaining = _remaining;

        tokenFund.mint(company,companyTokens);
        tokensIssued += companyTokens;

        tokenFund.mint(partners,partnersTokens);
        tokensIssued += partnersTokens;

    }

    // @return true if crowdsale event has ended
    function inProgress() public constant returns (bool) {
        return isInProgress && (tokensIssued < totalSupply);
    }


    /**
     * @dev Must be called after crowdsale ends, to do some extra finalization
     * work. Calls the contract's finalization function.
     */
    function finalize() external onlyOwner {
        require(!isFinalized);
        require(!inProgress());

        finalization();
        Finalized();

        isFinalized = true;
    }

    function start() external onlyOwner {
        require(!isInProgress);
        require(!isFinalized);
        Started();

        isInProgress = true;
    }
    function end() external onlyOwner {
        require(isInProgress);
        require(!isFinalized);
        Ended();

        isInProgress = false;
    }

    /**
     * @dev Can be overriden to add finalization logic. The overriding function
     * should call super.finalization() to ensure the chain of finalization is
     * executed entirely.
     */
    function finalization() internal {
        tokenFund.mint(remaining,totalSupply - tokensIssued);
        tokenFund.finishMinting();
        tokenFund.transferOwnership(owner);
    }

    function validPurchase(uint tokenCount) internal constant returns (bool) {
        return (tokensIssued + tokenCount <= totalSupply);
    }

}