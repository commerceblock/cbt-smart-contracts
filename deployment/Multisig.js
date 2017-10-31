
const MultiSigWallet_json = require('../build/contracts/MultiSigWallet.json');

module.exports = {
    prepare :  function() {
    var owners = JSON.parse(fs.readFileSync('./owners.json', 'utf8'));
    var owner1 = owners.owner1;
    var owner2 = owners.owner2;
    var owner3 = owners.owner3;
    var MultiSigWallet = contract(MultiSigWallet_json);

    var MultiSigWallet_contract = web3.eth.contract(MultiSigWallet.abi);
    var MultiSigWallet_byteCode = MultiSigWallet.unlinked_binary;
    var contractData = MultiSigWallet_contract.getData([owner1,owner2,owner3] ,2, {data: MultiSigWallet_byteCode});
    fs.writeFile('./MultiSigContract.bytecode', contractData);
    
   }
  }



