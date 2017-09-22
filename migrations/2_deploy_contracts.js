
const CBToken = artifacts.require("./CommerceBlockToken.sol");

module.exports = function(deployer, network) {

	const acc1 = web3.eth.accounts[0];
	const acc2 = web3.eth.accounts[1];

    if (network == 'development') {
		const company = acc2;
        deployer.deploy(CBToken, company);
	}

};
