const CBToken_json = require('../build/contracts/CommerceBlockToken.json');

module.exports = {
    prepare :  function() {
    var MultiSigWalletAddress = fs.readFileSync('./MultiSigWallet.address', 'utf8');
    var CBToken = contract(CBToken_json);

    var CBToken_contract = web3.eth.contract(CBToken.abi);
    var CBToken_byteCode = CBToken.unlinked_binary;
    var contractData = CBToken_contract.getData(MultiSigWalletAddress, {data: CBToken_byteCode});
    fs.writeFile('./CBTokenContract.bytecode', contractData);
   }
  }



