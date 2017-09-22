
// imports
const fs = require('fs');
const hdkey = require('ethereumjs-wallet/hdkey');
const ProviderEngine = require('web3-provider-engine');
const WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
const Web3Subprovider = require('web3-provider-engine/subproviders/web3.js');
const Web3 = require('web3');

// consts
const PROVIDER_URL = 'https://ropsten.infura.io/hNI5iNGYJ3VAbw3v1cRK';
const WALLET_HDPATH = "m/44'/60'/0'/0/0";

const hdwallet = hdkey.fromMasterSeed(process.env.ROPSTEN_SEED);
const wallet = hdwallet.derivePath(WALLET_HDPATH).getWallet();
const engine = new ProviderEngine();
engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(PROVIDER_URL)));

engine.start(); // Required by the provider engine.

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      network_id: 3,    // Official ropsten network id
      provider: engine, // Use our custom provider
      from: wallet.getAddressString()     // Use the address we derived
    }
  },
  build: function(options, callback) {
    var company =  options._[0].replace(/['']+/g, '');
    var json = require('./build/contracts/CommerceBlockToken.json');
    var contract = require('truffle-contract');
    var CBToken = contract(json);

    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    var MyContract = web3.eth.contract(CBToken.abi);
    var contractData = MyContract.new.getData(company, {data: CBToken.unlinked_binary});
    var fs = require('fs');
    fs.writeFile('./byteCode', contractData);
   }
};
