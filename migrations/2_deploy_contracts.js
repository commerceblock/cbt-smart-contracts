var fund = artifacts.require("./Fund.sol");
var CBToken = artifacts.require("./CBToken.sol");
var latestTime = web3.eth.getBlock('latest').timestamp;


module.exports = function(deployer, network) {

	var acc1 = web3.eth.accounts[0];
	var acc2 = web3.eth.accounts[1];
	var acc3 = web3.eth.accounts[2];
	var acc4 = web3.eth.accounts[3];

    if (network == 'development') {
		var company = acc2;
		var partners = acc3;
		var _remaining = acc4;
	}


    deployer.deploy(fund, company, partners, _remaining).then(function() {
           return fund.deployed();
      }).then(function(instance) {
               		tokenContract = instance;
               		return tokenContract.start(latestTime + 120);
               	});

};
