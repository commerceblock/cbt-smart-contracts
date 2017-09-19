
var gasAmount = 2000000;

var CBToken = artifacts.require("./CBToken.sol");
var Fund = artifacts.require("./Fund.sol");


// Test investments
contract('CBToken fund unit tests', function (accounts) {
    // Owner of the contract
    var owner = accounts[0];
    var company = accounts[1];
    var partners = accounts[2];
    var remaining = accounts[3];
    var contract;
    var token;

    it("check start , end", async function () {
        contract = await Fund.new(company, partners, remaining);
        // new Fund(company, partners, remaining);
        var address = await contract.ERC20CBT();
        token = web3.eth.contract(CBToken.abi).at(address);

        var inProgress = await contract.inProgress();
        assert.equal(inProgress, false, "isInprogress");

        //issue tokens should fail before contract start
        try {
            await contract.issueTokens(accounts[6], 50000000);
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        //end should fail before contract start
        try {
            await contract.end();
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        await contract.start();

        inProgress = await contract.isInProgress();
        assert.equal(inProgress, true, "isFinalized");

        await contract.issueTokens(accounts[6], 50000000);

        await contract.end();

        inProgress = await contract.isInProgress();
        assert.equal(inProgress, false, "isFinalized");

        //issue tokens should fail after contract end
        try {
            await contract.issueTokens(accounts[6], 50000000);
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

    });

    it("check control by owner", async function () {
        contract = await Fund.new(company, partners, remaining);

        var address = await contract.ERC20CBT();
        token = web3.eth.contract(CBToken.abi).at(address);

        var inProgress = await contract.isInProgress();
        assert.equal(inProgress, false, "isInprogress");

        //operation should fail
        try {
            await contract.start({ from: accounts[6] });
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        inProgress = await contract.isInProgress();
        assert.equal(inProgress, false, "isInprogress");

        await contract.start({ from: accounts[0] });

        inProgress = await contract.isInProgress();
        assert.equal(inProgress, true, "isInprogress");

        await contract.issueTokens(accounts[4], 2000000)
        issuedTokens = await token.totalSupply();
        assert.equal(issuedTokens.toNumber(), 602000000, "not 602 M");

        var balanceOf4 = token.balanceOf(accounts[4]);
        assert.equal(balanceOf4.toNumber(), 2000000, "not 2 M");

        try {
            await contract.issueTokens(accounts[5], 32010120, { from: accounts[1] });
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }
        issuedTokens = await token.totalSupply();
        assert.equal(issuedTokens.toNumber(), 602000000, "not corect amount");

        var balanceOf5 = token.balanceOf(accounts[5]);
        assert.equal(balanceOf5.toNumber(), 0, "not 2 M");

        try {
            await contract.end({ from: accounts[1] });
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        inProgress = await contract.isInProgress();
        assert.equal(inProgress, true, "isInprogres");

        await contract.end();

        inProgress = await contract.isInProgress();
        assert.equal(inProgress, false, "isInprogres");

        try {
            await contract.finalize({ from: accounts[1] });
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        var isFinalized = await contract.isFinalized();
        assert.equal(isFinalized, false, "isFinalized");

        await contract.finalize();

        isFinalized = await contract.isFinalized();
        assert.equal(isFinalized, true, "isFinalized");
    });

    it("check finalize", async function () {
        contract = await Fund.new(company, partners, remaining);
        var address = await contract.ERC20CBT();
        token = web3.eth.contract(CBToken.abi).at(address);
        isFinalized = await contract.isFinalized();
        assert.equal(isFinalized, false, "isFinalized");

        await contract.finalize();
        isFinalized = await contract.isFinalized();

        // contract is finalized
        assert.equal(isFinalized, true, "isFinalized");
        var balance = token.balanceOf.call(remaining);
        // make sure that remaining tokens moved to remaining acount
        assert.equal(balance.toNumber(), 400000000, "not correct balance");

        var totalSupply = await token.totalSupply();
        assert.equal(totalSupply.toNumber(), 1000000000, "not correct balance");

        //iisue tokens should faile after contract fainalization
        try {
            await contract.issueTokens(accounts[6], 50000000);
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }
    });


    it("check issue token after reaching max", async function () {
        contract = await Fund.new(company, partners, remaining);
        var address = await contract.ERC20CBT();
        token = web3.eth.contract(CBToken.abi).at(address);;

        await contract.start();
        await contract.issueTokens(accounts[6], 380000000);

        try {
            var x = await contract.issueTokens(accounts[6], 21000000);
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        var balanceOf6 = token.balanceOf(accounts[6]);
        assert.equal(balanceOf6.toNumber(), 380000000, "tokens");

        await contract.issueTokens(accounts[6], 10000000);


        var balanceOf6 = token.balanceOf(accounts[6]);
        assert.equal(balanceOf6.toNumber(), 390000000, "tokens");

        await contract.issueTokens(accounts[6], 10000000);

        var balanceOf6 = token.balanceOf(accounts[6]);
        assert.equal(balanceOf6.toNumber(), 400000000, "tokens");

        var inProgress = await contract.inProgress();
        assert.equal(inProgress, false, "tokens");

    });


});
