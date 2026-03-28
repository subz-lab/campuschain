import crypto from 'crypto';

class Block {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto.createHash('sha256').update(
      this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce
    ).digest('hex');
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), [{ sender: 'SYSTEM', recipient: 'GENESIS', amount: 0 }], '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(sender, recipient, amount) {
    const tx = {
      sender,
      recipient,
      amount,
      timestamp: Date.now(),
      txHash: crypto.createHash('sha256').update(sender + recipient + amount + Date.now() + Math.random()).digest('hex')
    };
    this.pendingTransactions.push(tx);

    // Auto-mine a new block with pending transactions
    const block = new Block(
      this.chain.length,
      Date.now(),
      [...this.pendingTransactions],
      this.getLatestBlock().hash
    );
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.pendingTransactions = [];

    return { block, transaction: tx };
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.sender === address) balance -= tx.amount;
        if (tx.recipient === address) balance += tx.amount;
      }
    }
    return balance;
  }

  getTransactionsOfAddress(address) {
    const txs = [];
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.sender === address || tx.recipient === address) {
          txs.push(tx);
        }
      }
    }
    return txs.reverse();
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

export default Blockchain;
