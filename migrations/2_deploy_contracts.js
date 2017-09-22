
const CBToken = artifacts.require("./CommerceBlockToken.sol");

module.exports = function(deployer, network) {



    if (network == 'development') {
		const company = web3.eth.accounts[1];
        deployer.deploy(CBToken, company);
	}

	if (network == 'ropsten') {
    	deployer.deploy(CBToken,"0x3A2Eb7a5B61699067C372AedAC5b684Ef2BC80Dc")
    }

};
