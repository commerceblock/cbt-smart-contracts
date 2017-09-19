
var gasAmount = 2000000;

var CBToken = artifacts.require("./CBToken.sol");
var Fund = artifacts.require("./Fund.sol");


// Test investments
contract('CBToken fund integration test', function (accounts) {
    // Owner of the contract
    var owner = accounts[0];
    var company = accounts[1];
    var partners = accounts[2];
    var remaining = accounts[3];
    var contract;
    var token;

    //test contract creation
    it("check contract creation", function (done) {
        // CBToken Contract


        Fund.deployed().then(function (instance) {
            contract = instance;
            return contract.ERC20CBT();
        }).then(function (address) {
            token = web3.eth.contract(CBToken.abi).at(address);
            return token.balanceOf.call(company);
        }).then(function (balance) {
            // make sure that company account have 300 million tokens
            assert.equal(balance.toNumber(), 300000000, "not 300 million balance");
            return token.balanceOf.call(partners);
        }).then(function (balance) {
            // make sure that partners account have 300 million tokens
            assert.equal(balance.toNumber(), 300000000, "not 300 million balance");
            return token.balanceOf.call(remaining);
        }).then(function (balance) {
            // make sure that partners account have 0 tokens
            assert.equal(balance.toNumber(), 0, "not 0 balance");
            return contract.isInProgress();
        }).then(function (isInProgress) {
            // make sure that partners account have 0 tokens
            assert.equal(isInProgress, false, "inprogress");
            return token.owner();
        }).then(function (_owner) {
            // make sure that partners account have 0 tokens
            assert.equal(_owner, contract.address, "not contract address");
            return;
        }).then(done);
    });


    //test sale 
    it("start sale", async function () {

        try {
            await contract.start({ from: accounts[1] })
            assert.fail('should have thrown before');
        } catch (error) {

            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }        
        await contract.start({ from: accounts[0] })
        var inprogress = await contract.isInProgress();
        assert.equal(inprogress, true, "not inprogress");
        
        balanceOf4 = token.balanceOf(accounts[4]);
        assert.equal(balanceOf4.toNumber(), 0, "not 2 M");

        try {
            await contract.issueTokens(accounts[4], 2000000, { from: accounts[3] })
            assert.fail('should have thrown before');
        } catch (error) {

            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        balanceOf4 = token.balanceOf(accounts[4]);
        assert.equal(balanceOf4.toNumber(), 0, "not 2 M");

        var issuedTokens = await  token.totalSupply();
        assert.equal(issuedTokens, 600000000, "not 600 M");
        
        await contract.issueTokens(accounts[4], 2000000)
        issuedTokens = await  token.totalSupply();
        assert.equal(issuedTokens.toNumber(), 602000000, "not 602 M");
        
        balanceOf4 = token.balanceOf(accounts[4]);
        assert.equal(balanceOf4.toNumber(), 2000000, "not 2 M");
            
        await contract.issueTokens(accounts[5], 32010120);
        issuedTokens = await  token.totalSupply();
        assert.equal(issuedTokens.toNumber(), 634010120, "not corect amount");
        
        var balanceOf5 = token.balanceOf(accounts[5]);
        assert.equal(balanceOf5.toNumber(), 32010120, "not 2 M");

        await contract.issueTokens(accounts[6], 84563215);
        issuedTokens = await  token.totalSupply();
        assert.equal(issuedTokens.toNumber(), 718573335, "not corect amount");
        
        var balanceOf6 = await token.balanceOf(accounts[6]);
        assert.equal(balanceOf6.toNumber(), 84563215, "not corect amount");
        
        await contract.issueTokens(accounts[4], 18750321);
        issuedTokens = await  token.totalSupply();
        assert.equal(issuedTokens.toNumber(), 737323656, "not corect amount");
        
         balanceOf4 = token.balanceOf(accounts[4]);
         assert.equal(balanceOf4.toNumber(), 20750321, "not corect amount");
         
        await contract.issueTokens(accounts[5], 640000);
        issuedTokens = await  token.totalSupply();
        assert.equal(issuedTokens.toNumber(), 737963656, "not corect amount");
        
         balanceOf5 = token.balanceOf(accounts[5]);
         assert.equal(balanceOf5.toNumber(), 32650120, "not corect amount");
         
        await contract.issueTokens(accounts[6], 11111111);
        issuedTokens = await  token.totalSupply();
        assert.equal(issuedTokens.toNumber(), 749074767, "not corect amount");
        
         balanceOf6 = await token.balanceOf(accounts[6]);
         assert.equal(balanceOf6.toNumber(), 95674326, "not corect amount");
         
    });

    //end and finailizer 
    it("check end and finalize", async function () {
        try {
            await contract.end({ from: accounts[1] })
            assert.fail('should have thrown before');
        } catch (error) {

            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        var isInProgress = await contract.isInProgress();
        assert.equal(isInProgress, true, "inprogress");

        await contract.end();
        try {
            await contract.issueTokens(accounts[6], 50000000);
            assert.fail('should have thrown before');
        } catch (error) {
            //console.log(error.message);
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        var issuedTokens = await token.totalSupply();
        assert.equal(issuedTokens.toNumber(), 749074767, "not corect amount");

        var balanceOf6 = await token.balanceOf(accounts[6]);
        assert.equal(balanceOf6.toNumber(), 95674326, "not corect amount");
        isInProgress = await contract.isInProgress();
        assert.equal(isInProgress, false, "inprogress");

        var isFinalized = await contract.isFinalized();
        assert.equal(isFinalized, false, "isFinalized");

        try {
            await contract.end({ from: accounts[1] })
            assert.fail('should have thrown before');
        } catch (error) {

            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        isFinalized = await contract.isFinalized();
        assert.equal(isFinalized, false, "isFinalized");

        await contract.finalize();
        isFinalized = await contract.isFinalized();

        // contract is finalized
        assert.equal(isFinalized, true, "isFinalized");
        var balance = token.balanceOf.call(remaining);
        // make sure that remaining tokens moved to remaining acount
        assert.equal(balance.toNumber(), 250925233, "not correct balance");

    });


    //end and finailizer 
    it("check transfer", async function () {

        try {
            token.transfer(accounts[7], 100000);
            assert.fail('should have thrown before');
        } catch (error) {

            assert.isAbove(error.message.search('invalid address'), -1, 'Invalid address error must be returned');
        }

        try {
            token.transfer(accounts[7], 100000, { from: accounts[0] });
            assert.fail('should have thrown before');
        } catch (error) {

            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        var balanceOf7 = await token.balanceOf(accounts[7]);
        assert.equal(balanceOf7.toNumber(), 0, "not corect amount");

        await token.transfer(accounts[7], 1000000, { from: accounts[1] });
        await token.transfer(accounts[8], 10000000, { from: accounts[2] });
        await token.transfer(accounts[7], 10000000, { from: accounts[2] });

        balanceOf7 = await token.balanceOf(accounts[7]);
        var balanceOf1 = await token.balanceOf(accounts[1]);
        var balanceOf2 = await token.balanceOf(accounts[2]);
        var balanceOf8 = await token.balanceOf(accounts[8]);

        assert.equal(balanceOf7.toNumber(), 11000000, "not corect amount");
        assert.equal(balanceOf8.toNumber(), 10000000, "not corect amount");
        assert.equal(balanceOf1.toNumber(), 299000000, "not corect amount");
        assert.equal(balanceOf2.toNumber(), 280000000, "not corect amount");

        await token.transfer(accounts[7], 10000000, { from: accounts[8] });

        balanceOf8 = await token.balanceOf(accounts[8]);
        balanceOf7 = await token.balanceOf(accounts[7]);

        assert.equal(balanceOf7.toNumber(), 21000000, "not corect amount");
        assert.equal(balanceOf8.toNumber(), 0, "not corect amount");

        try {
            token.transfer(accounts[7], 100000, { from: accounts[8] });
            assert.fail('should have thrown before');
        } catch (error) {

            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }
    });


    //allowence
    it("check allowence", async function () {

        try {
            token.transferFrom(accounts[7], accounts[8], 100000, { from: accounts[6] });
            assert.fail('should have thrown before');
        } catch (error) {

            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }



        await token.approve(accounts[6], 10000000, { from: accounts[7] });
        await token.approve(accounts[5], 10000000, { from: accounts[7] });


        try {
            token.transferFrom(accounts[7], accounts[8], 10000001, { from: accounts[6] });
            assert.fail('should have thrown before');
        } catch (error) {

            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcodeerror must be returned');
        }

        token.transferFrom(accounts[7], accounts[8], 10000000, { from: accounts[6] });
        var balanceOf7 = await token.balanceOf(accounts[7]);
        assert.equal(balanceOf7.toNumber(), 11000000, "not corect amount");
        var balanceOf8 = await token.balanceOf(accounts[8]);
        assert.equal(balanceOf8.toNumber(), 10000000, "not corect amount");

        token.transferFrom(accounts[7], accounts[9], 3000000, { from: accounts[5] });
        balanceOf7 = await token.balanceOf(accounts[7]);
        assert.equal(balanceOf7.toNumber(), 8000000, "not corect amount");
        var balanceOf9 = await token.balanceOf(accounts[9]);
        assert.equal(balanceOf9.toNumber(), 3000000, "not corect amount");

    });
});
