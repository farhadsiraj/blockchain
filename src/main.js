const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate(
  'ac12424a60c36c1d50fb536d7fa6980be6bca902159c32319a994005f968f2a5'
);
const myWalletAddress = myKey.getPublic('hex');

let farhadCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'address2', 10);
tx1.signTransaction(myKey);
farhadCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
farhadCoin.minePendingTransactions(myWalletAddress);

console.log(
  '\nBalance of wallet is',
  farhadCoin.getBalanceOfAddress(myWalletAddress)
);

// farhadCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', farhadCoin.isChainValid());
