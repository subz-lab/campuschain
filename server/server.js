import express from 'express';
import cors from 'cors';
import Blockchain from './blockchain.js';

const app = express();
app.use(cors());
app.use(express.json());

const campusChain = new Blockchain();

// Seed the admin wallet with initial tokens
campusChain.addTransaction('SYSTEM', 'ADMIN', 100000);
campusChain.addTransaction('ADMIN', 'jane-student', 12500);
campusChain.addTransaction('jane-student', 'cafe-coffee-day', 120);
campusChain.addTransaction('jane-student', 'library', 50);
campusChain.addTransaction('alex', 'jane-student', 200);

// ─── WALLET ────────────────────────────────────────────────
app.get('/api/wallet/:address', (req, res) => {
  const { address } = req.params;
  const balance = campusChain.getBalanceOfAddress(address);
  const transactions = campusChain.getTransactionsOfAddress(address);
  res.json({ address, balance, transactions });
});

// ─── TRANSFER (P2P) ───────────────────────────────────────
app.post('/api/transfer', (req, res) => {
  const { sender, recipient, amount } = req.body;
  if (!sender || !recipient || !amount) {
    return res.status(400).json({ error: 'Missing sender, recipient, or amount' });
  }

  const senderBalance = campusChain.getBalanceOfAddress(sender);
  if (senderBalance < amount) {
    return res.status(400).json({ error: 'Insufficient balance', balance: senderBalance });
  }

  const result = campusChain.addTransaction(sender, recipient, Number(amount));
  res.json({
    success: true,
    txHash: result.transaction.txHash,
    blockIndex: result.block.index,
    blockHash: result.block.hash,
    newBalance: campusChain.getBalanceOfAddress(sender)
  });
});

// ─── ADMIN: ALLOCATE FUNDS ───────────────────────────────
app.post('/api/mint', (req, res) => {
  const { recipient, amount } = req.body;
  if (!recipient || !amount) {
    return res.status(400).json({ error: 'Missing recipient or amount' });
  }

  const result = campusChain.addTransaction('ADMIN', recipient, Number(amount));
  res.json({
    success: true,
    txHash: result.transaction.txHash,
    blockIndex: result.block.index,
    blockHash: result.block.hash
  });
});

// ─── CHAIN EXPLORER ──────────────────────────────────────
app.get('/api/chain', (req, res) => {
  res.json({
    chain: campusChain.chain,
    length: campusChain.chain.length,
    isValid: campusChain.isChainValid()
  });
});

// ─── BLOCK DETAILS ───────────────────────────────────────
app.get('/api/block/:index', (req, res) => {
  const block = campusChain.chain[req.params.index];
  if (!block) return res.status(404).json({ error: 'Block not found' });
  res.json(block);
});

// ─── HEALTH ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', chainLength: campusChain.chain.length, valid: campusChain.isChainValid() });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🔗 CampusChain+ Blockchain API running on http://localhost:${PORT}`);
  console.log(`📦 Chain length: ${campusChain.chain.length} blocks`);
  console.log(`✅ Chain valid: ${campusChain.isChainValid()}`);
});
