
const MultiSigWallet_json = require('../build/contracts/MultiSigWallet.json');

module.exports = {
    deploy :  function(deployAccount,gas,gasPrice) {
    var owners = JSON.parse(fs.readFileSync('./owners.json', 'utf8'));
    var owner1 = owners.owner1;
    var owner2 = owners.owner2;
    var owner3 = owners.owner3;
    var MultiSigWallet = contract(MultiSigWallet_json);

    var MultiSigWallet_contract = web3.eth.contract(MultiSigWallet.abi);
    var MultiSigWallet_byteCode = MultiSigWallet.unlinked_binary;
    // console.log(MultiSigWallet_contract)
    MultiSigWallet_contract.new([owner1,owner2,owner3] ,2 ,{
      data: MultiSigWallet_byteCode,
      from: deployAccount,
      gas: gas,
      gasPrice: gasPrice
    }, function(error, MultiSigWalletContract){
       if(error){
        console.log('error :  ' + error)
       }
       else {
          console.log('transactionHash :  ' + MultiSigWalletContract.transactionHash) }
          if(MultiSigWalletContract.address){
            console.log('address :  ' + MultiSigWalletContract.address)
            fs.writeFile('./MultiSigWallet.address', MultiSigWalletContract.address);
        }
       });
   }
  }



