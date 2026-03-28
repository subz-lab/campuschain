import { useState, useEffect } from 'react';
import { ArrowUpRight, QrCode, ArrowDownLeft, Clock, GraduationCap, Ticket } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';
import { getWallet } from '../lib/api';

export default function Dashboard({ onNavigate }) {
  const { offset, rotate, handleMouseMove, handleMouseLeave } = useParallax(15);
  
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const tokenName = "CampusCoin (CCT)";
  
  // Budget tracker logic
  const budgetTotal = 1000;

  useEffect(() => {
    getWallet('jane-student').then(data => {
      setBalance(data.balance);
      setTransactions(data.transactions.slice(0, 5));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const budgetUsed = transactions
    .filter(tx => tx.sender === 'jane-student')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const budgetPercent = Math.min((budgetUsed / budgetTotal) * 100, 100);
  
  let progressColor = "bg-green-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]";
  if (budgetPercent > 75) progressColor = "bg-yellow-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]";
  if (budgetPercent > 90) progressColor = "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]";

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Wallet Card */}
      <div 
        className="glass-panel p-6 relative overflow-hidden cursor-pointer transition-transform ease-out duration-300 group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)` }}
      >
        <div 
          className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-[40px] -translate-y-16 translate-x-16 transition-transform ease-out duration-300"
          style={{ transform: `translate3d(${-offset.x * 2}px, ${-offset.y * 2}px, 0)` }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[40px] translate-y-16 -translate-x-16 transition-transform ease-out duration-300"
          style={{ transform: `translate3d(${offset.x * 2}px, ${offset.y * 2}px, 0)` }}
        ></div>
        
        <div className="relative z-10 pointer-events-none transition-transform ease-out duration-300" style={{ transform: `translate3d(${offset.x / 2}px, ${offset.y / 2}px, 0)` }}>
          <p className="text-gray-400 font-medium text-sm mb-1">Total Balance</p>
          <div className="flex items-baseline gap-2 mb-2">
            {loading ? (
              <div className="h-10 w-40 bg-white/10 rounded animate-pulse"></div>
            ) : (
              <span className="text-4xl font-extrabold tracking-tight">₹{balance.toLocaleString()}</span>
            )}
          </div>
          <div className="inline-flex items-center gap-2 bg-white/5 py-1 px-3 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></span>
            <span className="text-xs font-semibold text-purple-300 tracking-wider uppercase">{tokenName}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        <button onClick={() => onNavigate('send')} className="glass-panel p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
            <ArrowUpRight size={20} />
          </div>
          <span className="text-xs font-semibold">Send</span>
        </button>
        <button onClick={() => onNavigate('payqr')} className="glass-panel p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <QrCode size={20} />
          </div>
          <span className="text-xs font-semibold">Pay QR</span>
        </button>
        <button onClick={() => onNavigate('fees')} className="glass-panel p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
            <GraduationCap size={20} />
          </div>
          <span className="text-xs font-semibold">Fees</span>
        </button>
        <button onClick={() => onNavigate('events')} className="glass-panel p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
            <Ticket size={20} />
          </div>
          <span className="text-xs font-semibold">Events</span>
        </button>
      </div>

      {/* Budget Tracker */}
      <div className="glass-panel p-5 mt-2">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h3 className="font-semibold text-white">Weekly Budget</h3>
            <p className="text-xs text-gray-400 mt-1">Reset in 2 days</p>
          </div>
          <div className="text-right">
            <span className={`text-lg font-bold ${budgetPercent > 90 ? 'text-red-400' : budgetPercent > 75 ? 'text-yellow-400' : 'text-white'}`}>
              ₹{budgetUsed}
            </span>
            <span className="text-sm text-gray-500"> / ₹{budgetTotal}</span>
          </div>
        </div>
        
        {/* Progress Bar Container */}
        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${progressColor}`}
            style={{ width: `${budgetPercent}%` }}
          ></div>
        </div>
        
        {budgetPercent > 90 && (
          <p className="text-xs text-red-400 mt-3 flex items-center gap-1 font-medium bg-red-400/10 py-1.5 px-3 rounded-md">
            ⚠️ Almost reached your limit!
          </p>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="mt-2">
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock size={18} className="text-purple-400" /> Recent
          </h3>
          <button className="text-xs text-blue-400 font-medium hover:text-blue-300">View All</button>
        </div>
        
        <div className="flex flex-col gap-3">
          {loading ? (
            [1,2,3].map(i => <div key={i} className="glass-panel p-4 h-16 animate-pulse bg-white/5 rounded-2xl"></div>)
          ) : transactions.map((tx, i) => {
            const isSent = tx.sender === 'jane-student';
            const Icon = isSent ? ArrowUpRight : ArrowDownLeft;
            return (
              <div key={i} className="glass-panel p-4 flex items-center justify-between group hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSent ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm capitalize">{isSent ? tx.recipient : tx.sender}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">Tx: <span className="font-mono text-purple-400/80">{tx.txHash?.slice(0, 10)}...</span></p>
                  </div>
                </div>
                <div className={`font-bold ${!isSent ? 'text-green-400' : 'text-white'}`}>
                  {isSent ? '-' : '+'}₹{tx.amount}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
