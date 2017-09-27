
const CBToken = artifacts.require('../contracts/CommerceBlockToken.sol');

contract('CBT integration tests', function (accounts) {
    // Owner of the contract
    var company = accounts[1];
    var token;

    const decimals = (10 ** 18)


    //test sale
    it("start sale", async function () {

        token = await CBToken.deployed();

        var totalSupply = await token.totalSupply()
        assert.equal(totalSupply.toNumber(), (10 ** 9) * decimals, "not correct");

        var balanceOfCompany = await token.balanceOf(accounts[1]);
        assert.equal(balanceOfCompany.toNumber(), (10 ** 9) * decimals, "not correct");

        var balanceOf4 = await token.balanceOf(accounts[4]);
        assert.equal(balanceOf4.toNumber(), 0, "not correct");

        await token.transfer(accounts[4], 20000000 * decimals, { from: company });

        balanceOf4 = await token.balanceOf(accounts[4]);
        assert.equal(balanceOf4.toNumber(), 20000000 * decimals, "not correct");

        balanceOfCompany = await token.balanceOf(accounts[1]);
        assert.equal(balanceOfCompany.toNumber(), 980000000 * decimals, "not correct");

        await token.transfer(accounts[5], 12000000 * decimals, { from: company });

        var balanceOf5 = await token.balanceOf(accounts[5]);
        assert.equal(balanceOf5.toNumber(), 12000000 * decimals, "not correct");

        balanceOfCompany = await token.balanceOf(accounts[1]);
        assert.equal(balanceOfCompany.toNumber(), 968000000 * decimals, "not correct");

        await token.transfer(accounts[6], 23000000 * decimals, { from: company });

        var balanceOf6 = await token.balanceOf(accounts[6]);
        assert.equal(balanceOf6.toNumber(), 23000000 * decimals, "not correct");

        balanceOfCompany = await token.balanceOf(accounts[1]);
        assert.equal(balanceOfCompany.toNumber(), 945000000 * decimals, "not correct");

        await token.transfer(accounts[4], 17000000 * decimals, { from: company });

        balanceOf4 = await token.balanceOf(accounts[4]);
        assert.equal(balanceOf4.toNumber(), 37000000 * decimals, "not correct");

        balanceOfCompany = await token.balanceOf(accounts[1]);
        assert.equal(balanceOfCompany.toNumber(), 928000000 * decimals, "not correct");

        await token.transfer(accounts[5], 6128479 * decimals, { from: company });

        balanceOf5 = await token.balanceOf(accounts[5]);
        assert.equal(balanceOf5.toNumber(), 18128479 * decimals, "not correct");

        balanceOfCompany = await token.balanceOf(accounts[1]);
        assert.equal(balanceOfCompany.toNumber(), 921871521 * decimals, "not correct");

        await token.transfer(accounts[6], 84596321 * decimals, { from: company });

        balanceOf6 = await token.balanceOf(accounts[6]);
        assert.equal(balanceOf6.toNumber(), 107596321 * decimals, "not correct");

        balanceOfCompany = await token.balanceOf(accounts[1]);
        assert.equal(balanceOfCompany.toNumber(), 837275200 * decimals, "not correct");
    });


    //end and finailizer
    it("check transfer", async function () {

        try {
            await token.transfer(accounts[7], 100000 * decimals, { from: accounts[2] });
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        try {
            await token.transfer(accounts[7], 100000 * decimals, { from: accounts[0] });
            assert.fail('should have thrown before');
        } catch (error) {
            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        var balanceOf7 = await token.balanceOf(accounts[7]);
        assert.equal(balanceOf7.toNumber(), 0, "not corect amount");

        await token.transfer(accounts[7], 1000000 * decimals, { from: accounts[4] });
        await token.transfer(accounts[8], 10000000 * decimals, { from: accounts[4] });
        await token.transfer(accounts[7], 10000000 * decimals, { from: accounts[5] });

        balanceOf7 = await token.balanceOf(accounts[7]);
        var balanceOf5 = await token.balanceOf(accounts[5]);
        var balanceOf4 = await token.balanceOf(accounts[4]);
        var balanceOf8 = await token.balanceOf(accounts[8]);

        assert.equal(balanceOf7.toNumber(), 11000000 * decimals, "not corect amount");
        assert.equal(balanceOf8.toNumber(), 10000000 * decimals, "not corect amount");
        assert.equal(balanceOf5.toNumber(), 8128479 * decimals, "not corect amount");
        assert.equal(balanceOf4.toNumber(), 26000000 * decimals, "not corect amount");

        await token.transfer(accounts[7], 10000000 * decimals, { from: accounts[8] });

        balanceOf8 = await token.balanceOf(accounts[8]);
        balanceOf7 = await token.balanceOf(accounts[7]);

        assert.equal(balanceOf7.toNumber(), 21000000 * decimals, "not corect amount");
        assert.equal(balanceOf8.toNumber(), 0, "not corect amount");

        try {
            await token.transfer(accounts[7], 100000 * decimals, { from: accounts[8] });
            assert.fail('should have thrown before');
        } catch (error) {

            assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }
    });


    // allowance
    it("check allowance", async function () {

        try {
          await token.transferFrom(accounts[7], accounts[8], 100000 * decimals, { from: accounts[6] });
          assert.fail('should have thrown before');
        } catch (error) {
          assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');
        }

        await token.approve(accounts[6], 10000000 * decimals, { from: accounts[7] });
        await token.approve(accounts[5], 10000000 * decimals, { from: accounts[7] });

        try {
          await token.transferFrom(accounts[7], accounts[8], 10000001 * decimals, { from: accounts[6] });
          assert.fail('should have thrown before');
        } catch (error) {
          assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcodeerror must be returned');
        }

        token.transferFrom(accounts[7], accounts[8], 10000000 * decimals, { from: accounts[6] });
        var balanceOf7 = await token.balanceOf(accounts[7]);
        assert.equal(balanceOf7.toNumber(), 11000000 * decimals, "not corect amount");
        var balanceOf8 = await token.balanceOf(accounts[8]);
        assert.equal(balanceOf8.toNumber(), 10000000 * decimals, "not corect amount");

        token.transferFrom(accounts[7], accounts[9], 3000000 * decimals, { from: accounts[5] });
        balanceOf7 = await token.balanceOf(accounts[7]);
        assert.equal(balanceOf7.toNumber(), 8000000 * decimals, "not corect amount");
        var balanceOf9 = await token.balanceOf(accounts[9]);
        assert.equal(balanceOf9.toNumber(), 3000000 * decimals, "not corect amount");
    });

});
