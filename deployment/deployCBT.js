const CBToken_json = require('../build/contracts/CommerceBlockToken.json');

module.exports = {
    deploy :  function(deployAccount,gas,gasPrice) {
    var MultiSigWalletAddress = fs.readFileSync('./MultiSigWallet.address', 'utf8');
    var CBToken = contract(CBToken_json);

    var CBToken_contract = web3.eth.contract(CBToken.abi);
    var CBToken_byteCode = CBToken.unlinked_binary;
    // console.log(MultiSigWallet_contract)
    CBToken_contract.new(MultiSigWalletAddress,{
      data: CBToken_byteCode,
      from: deployAccount,
      gas: gas,
      gasPrice: gasPrice
    }, function(error, CBTokenContract){
       if(error){
        console.log('error :  ' + error)
       }
       else {
          console.log('transactionHash :  ' + CBTokenContract.transactionHash) }
          if(CBTokenContract.address){
            console.log('address :  ' + CBTokenContract.address)
            fs.writeFile('./CBTokenContract.address', CBTokenContract.address);
        }
       });
   }
  }



