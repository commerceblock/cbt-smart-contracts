'use strict';

const CBToken = artifacts.require('../contracts/CommerceBlockToken.sol');

//based on zeppelin-solidity tests
contract('CBToken', function(accounts) {

  const company = accounts[1];
  let token;

  beforeEach(async function() {
    token = await CBToken.new(company);
  });

  it('should start with a totalSupply of 10^9 * 10^18', async function() {
    const totalSupply = await token.totalSupply();
    assert.equal(totalSupply.toNumber(), (10 ** 9) * (10 ** 18));
  });

  it('should start with company account with 10^9 * 10^18', async function() {
    const balance = await token.balanceOf(company);
    assert(balance, (10 ** 9) * (10 ** 18));
  })

});
