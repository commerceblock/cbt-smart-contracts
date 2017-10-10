
// imports
const fs = require('fs');
const hdkey = require('ethereumjs-wallet/hdkey');
const ProviderEngine = require('web3-provider-engine');
const WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
const Web3Subprovider = require('web3-provider-engine/subproviders/web3.js');
const Web3 = require('web3');


module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    }
  },
  build: function(options, callback) {
    const company =  options._[0].replace(/['']+/g, '');
    const json = require('./build/contracts/CommerceBlockToken.json');
    const contract = require('truffle-contract');
    const CBToken = contract(json);

    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    const MyContract = web3.eth.contract(CBToken.abi);

    const contractData = MyContract.getData(company, {data: CBToken.unlinked_binary});
    fs.writeFile('./CommerceBlockToken.bytecode', contractData);
    fs.writeFile('./CommerceBlockToken.abi', contractData);
   }
};
