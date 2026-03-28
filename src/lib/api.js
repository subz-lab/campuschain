const API_BASE = 'http://localhost:3001/api';

export async function getWallet(address) {
  const res = await fetch(`${API_BASE}/wallet/${address}`);
  return res.json();
}

export async function sendTransfer(sender, recipient, amount) {
  const res = await fetch(`${API_BASE}/transfer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender, recipient, amount: Number(amount) })
  });
  return res.json();
}

export async function mintTokens(recipient, amount) {
  const res = await fetch(`${API_BASE}/mint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient, amount: Number(amount) })
  });
  return res.json();
}

export async function getChain() {
  const res = await fetch(`${API_BASE}/chain`);
  return res.json();
}

export async function getHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}
