// imports
fs = require('fs');
Web3 = require('web3');
const Accounts = require('web3-eth-accounts');
contract = require('truffle-contract');
PROVIDER_URL = 'http://127.0.0.1:8545';
web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));

const accounts = new Accounts(PROVIDER_URL);
const deployMultisig = require("./deployMultisig.js");
const deployCBT = require("./deployCBT.js");

const gas = 3000000;
const gasPrice = 50000000000;

var deploy = function(){
    var command = process.argv[2];
    web3.personal.unlockAccount(web3.eth.accounts[0]);
    if (command == 'Multisig'){
        deployMultisig.deploy(web3.eth.accounts[0],gas,gasPrice);
    }
    if (command == 'CBToken'){
        deployCBT.deploy(web3.eth.accounts[0],gas,gasPrice);
    }

}

deploy();

