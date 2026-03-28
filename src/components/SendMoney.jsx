import { useState } from 'react';
import { Send, CheckCircle2, User, Wallet } from 'lucide-react';

export default function SendMoney() {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const balance = 12500;

  const handleSend = (e) => {
    e.preventDefault();
    if (!receiver || !amount) return;
    
    setIsSending(true);
    // Simulate network request
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      
      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
        setReceiver('');
        setAmount('');
      }, 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 mb-2">Transfer Successful</h2>
        <p className="text-gray-400 font-medium mb-8">₹{amount} CCT sent to {receiver}</p>
        
        <div className="glass-panel p-4 w-full flex flex-col gap-2 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Network Fee</span>
            <span className="font-mono text-white">0.001 CCT</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Tx Hash</span>
            <span className="font-mono text-purple-400 cursor-pointer hover:underline">0x8f4d3a9...b39a</span>
          </div>
          <hr className="border-white/5 my-1" />
          <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors py-1">
            View on CampusScan Explorer ↗
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-4 pb-24 animate-in fade-in duration-300">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold">Send Money</h2>
        <p className="text-gray-400 text-sm mt-1 flex items-center justify-center gap-1">
          <Wallet size={14} className="text-purple-400" /> Available Balance: <span className="text-white font-semibold">₹{balance.toLocaleString()}</span>
        </p>
      </div>

      <form onSubmit={handleSend} className="glass-panel p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-300">Receiver ID or Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="e.g. Alex or @alex.c"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-300">Amount (CCT)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
            <input 
              type="number" 
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={balance}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white text-2xl font-bold placeholder-gray-700 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              required
            />
          </div>
          <div className="flex justify-end mt-1">
            <button type="button" onClick={() => setAmount(balance)} className="text-xs text-purple-400 hover:text-purple-300 font-semibold px-2 py-1 bg-purple-500/10 rounded">Use Max</button>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSending || !receiver || !amount}
          className={`mt-4 w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition-all
            ${isSending ? 'bg-purple-600 cursor-wait' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed'}
          `}
        >
          {isSending ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              Send Now <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
