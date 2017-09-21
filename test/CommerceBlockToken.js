'use strict';

var CBToken = artifacts.require('../contracts/CBToken.sol');

//based on zeppelin-solidity tests
contract('CBToken', function(accounts) {

  const company = accounts[1];
  let token;

  beforeEach(async function() {
    token = await CBToken.new(company);
  });

  it('should start with a totalSupply of 1000000000', async function() {
    let totalSupply = await token.totalSupply();

    assert.equal(totalSupply, 1000000000);
  });


  it('should start with company account with 1000000000', async function() {

    let balance0 = await token.balanceOf(company);
    assert(balance0, 1000000000);
  })

});
