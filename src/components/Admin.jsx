import { useState } from 'react';
import { ShieldAlert, Plus, Users, Check, X, Code2 } from 'lucide-react';
import { mintTokens } from '../lib/api';

export default function Admin() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [issued, setIssued] = useState(false);
  const [mintResult, setMintResult] = useState(null);
  const [policyDeploying, setPolicyDeploying] = useState(false);
  const [policyDeployed, setPolicyDeployed] = useState(false);

  const handleIssue = async (e) => {
    e.preventDefault();
    try {
      const data = await mintTokens(recipient, amount);
      setMintResult(data);
      setIssued(true);
      setTimeout(() => { setIssued(false); setMintResult(null); }, 5000);
    } catch(err) {
      setIssued(false);
    }
  };

  const handleDeployPolicy = () => {
    setPolicyDeploying(true);
    setTimeout(() => {
      setPolicyDeploying(false);
      setPolicyDeployed(true);
      setTimeout(() => setPolicyDeployed(false), 4000);
    }, 2000);
  };

  const requests = [
    { id: 1, user: 'John Doe', amount: 50, type: 'Event Reward', status: 'pending' },
    { id: 2, user: 'Sarah Smith', amount: 200, type: 'Top-up', status: 'pending' },
  ];

  return (
    <div className="flex flex-col gap-6 pt-4 pb-24 animate-in fade-in duration-300">
      
      <div className="glass-panel p-5 bg-purple-900/30 ring-1 ring-purple-500/50 flex items-center gap-4">
        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Admin Console</h2>
          <p className="text-xs text-gray-400 mt-1">Manage CampusToken limits</p>
        </div>
      </div>

      {/* Allocate Funds Section */}
      <div className="glass-panel p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Plus size={18} className="text-green-400" /> Allocate Funds
        </h3>
        
        <form onSubmit={handleIssue} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 font-medium mb-1 inline-block">Amount (CCT)</label>
            <input 
              type="number" 
              placeholder="e.g. 1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 font-medium mb-1 inline-block">Student Wallet / Roll No.</label>
            <input 
              type="text" 
              placeholder="e.g. jane-student"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
              required
            />
          </div>
          <button 
            type="submit"
            className={`w-full py-3 rounded-lg font-bold transition-all mt-2 ${issued ? 'bg-green-600' : 'bg-purple-600 hover:bg-purple-500'}`}
          >
            {issued ? 'Funds Allocated Successfully!' : 'Allocate Funds'}
          </button>
        </form>

        {mintResult && mintResult.success && (
          <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-xs flex flex-col gap-1">
            <div className="flex justify-between"><span className="text-gray-400">Block #</span><span className="font-mono text-white">{mintResult.blockIndex}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Tx Hash</span><span className="font-mono text-purple-400">{mintResult.txHash?.slice(0, 16)}...</span></div>
          </div>
        )}
      </div>

      {/* Smart Policy Deployer */}
      <div className="glass-panel p-6 ring-1 ring-blue-500/30">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Code2 size={18} className="text-blue-400" /> Automated Policies
        </h3>
        <p className="text-xs text-gray-400 mb-4">Deploy smart contracts to auto-regulate campus spending.</p>
        
        <div className="bg-black/40 border border-blue-500/20 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-sm">Restrict Canteen Spends</span>
            <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded font-bold">READY</span>
          </div>
          <p className="text-xs text-gray-500 font-mono">require(tx.amount &lt;= 500, "Daily limit hit");</p>
        </div>

        <button 
          onClick={handleDeployPolicy}
          disabled={policyDeploying || policyDeployed}
          className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2
            ${policyDeployed ? 'bg-green-600/50 text-green-300 ring-1 ring-green-500' : 
              policyDeploying ? 'bg-blue-600 cursor-wait' : 'bg-blue-600 hover:bg-blue-500'}
          `}
        >
          {policyDeploying ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : policyDeployed ? (
            <><Check size={18} /> Policy Active on CampusNetwork</>
          ) : (
             'Deploy to Network'
          )}
        </button>
      </div>

      {/* Pending Requests */}
      <div className="glass-panel p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Users size={18} className="text-blue-400" /> Pending Approvals
        </h3>
        
        <div className="flex flex-col gap-3">
          {requests.map(req => (
            <div key={req.id} className="bg-black/30 p-3 rounded-lg border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">{req.user}</p>
                <p className="text-xs text-gray-500">₹{req.amount} • {req.type}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                  <Check size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
