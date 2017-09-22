var fs = require('fs');

var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var ProviderEngine = require("web3-provider-engine");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");

// Get our mnemonic and create an hdwallet
var mnemonic = "flat damp atom garage rhythm hill harsh spell observe reopen size scorpion";
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/";
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
var address = "0x" + wallet.getAddress().toString("hex");

var providerUrl = "https://ropsten.infura.io/hNI5iNGYJ3VAbw3v1cRK";
var engine = new ProviderEngine();
engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));

engine.start(); // Required by the provider engine.

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      network_id: 3,    // Official ropsten network id
      provider: engine, // Use our custom provider      
      from: address     // Use the address we derived
    }
  },
  build: function(options, callback) {
    var company =  options._[0].replace(/['"]+/g, '');
    var json = require("./build/contracts/CommerceBlockToken.json");
    var contract = require("truffle-contract");
    var CBToken = contract(json);
        
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    var MyContract = web3.eth.contract(CBToken.abi);
    var contractData = MyContract.new.getData(company, {data: CBToken.unlinked_binary});
    var fs = require('fs');
    fs.writeFile("./byteCode", contractData);
   }
};
