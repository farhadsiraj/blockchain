const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined: ' + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }
  createGenesisBlock() {
    return new Block(0, '01/21/2021', 'This is Data', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    // newBlock.hash = newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    //start at index one because index 0 is the genesis block with default data
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let farhadCoin = new Blockchain();

console.log('Mining block 1...');
farhadCoin.addBlock(new Block(1, '01/22/2021', { amount: 6 }));

console.log('Mining block 2...');
farhadCoin.addBlock(new Block(2, '01/23/2021', { amount: 45 }));

// console.log('Is blockchain valid? ' + farhadCoin.isChainValid());

// farhadCoin.chain[1].data = { amount: 100 };
// farhadCoin.chain[1].hash = farhadCoin.chain[1].calculateHash();

// console.log('Is blockchain valid? ' + farhadCoin.isChainValid());

// console.log(JSON.stringify(farhadCoin, null, 4));
