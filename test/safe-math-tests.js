const SafeMathMock = artifacts.require('SafeMathMock');

contract('SafeMath tests', function(accounts) {

  let safeMath;

  before(async function() {
    safeMath = await SafeMathMock.new();
  });

  it('subtracts correctly', async function() {

    let a = Math.floor(Math.random() * 100);
    let b = Math.floor(Math.random() * 100);
    let subtract = await safeMath.subtract(a, b);
    let result = await safeMath.result();

    assert.equal(result, a - b);
  })

  it('add correctly', async function() {
    let a = Math.floor(Math.random() * 100);
    let b = Math.floor(Math.random() * 100);
    let add = await safeMath.add(a, b);
    let result = await safeMath.result();

    assert.equal(result, a + b);
  })
})
