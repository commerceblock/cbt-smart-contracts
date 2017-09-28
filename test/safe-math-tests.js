const SafeMathMock = artifacts.require('SafeMathMock');

contract('SafeMath tests', function(accounts) {

  let safeMath;

  before(async function() {
    safeMath = await SafeMathMock.new();
  });

  it('subtracts correctly', async function() {

    let randomSign = Math.random() < 0.5 ? -1 : 1;

    let a = Math.floor(Math.random() * 100) * randomSign;
    let b = Math.floor(Math.random() * 100) * randomSign;
    let subtract = await safeMath.subtract(a, b);
    let result = await safeMath.result();

    assert.equal(result, a - b);
  })

  it('add correctly', async function() {
    let randomSign = Math.random() < 0.5 ? -1 : 1;

    let a = Math.floor(Math.random() * 100) * randomSign;
    let b = Math.floor(Math.random() * 100) * randomSign;
    let add = await safeMath.add(a, b);
    let result = await safeMath.result();

    assert.equal(result, a + b);
  })
})
