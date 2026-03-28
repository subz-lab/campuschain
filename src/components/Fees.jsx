import { GraduationCap, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Fees() {
  const [fees, setFees] = useState([
    { id: 1, title: 'Semester 4 Tuition', amount: 85000, due: 'May 1, 2026', paid: false },
    { id: 2, title: 'Hostel Mess Fee', amount: 4500, due: 'Next Week', paid: false },
    { id: 3, title: 'Library Overdue Fine', amount: 50, due: 'Immediate', paid: false }
  ]);

  const handlePay = (id) => {
    setFees(fees.map(f => f.id === id ? { ...f, paid: true } : f));
  };

  return (
    <div className="flex flex-col gap-6 pt-4 pb-24 animate-in slide-in-from-right duration-300">
      <div className="glass-panel p-5 bg-green-900/20 ring-1 ring-green-500/50 flex items-center gap-4">
        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
          <GraduationCap size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">Campus Fees</h2>
          <p className="text-xs text-gray-400 mt-1">Pay instantly via Smart Contract</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-semibold px-2">Pending Dues</h3>
        
        {fees.map(fee => (
          <div key={fee.id} className={`glass-panel p-5 flex flex-col gap-3 transition-all ${fee.paid ? 'opacity-60 grayscale' : 'hover:scale-[1.02]'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold">{fee.title}</h4>
                <p className={`text-xs mt-1 ${fee.paid ? 'text-green-400' : 'text-red-400'}`}>
                  {fee.paid ? 'Paid Successfully' : `Due: ${fee.due}`}
                </p>
              </div>
              <div className="font-extrabold text-lg flex items-baseline gap-1">
                <span className="text-sm">₹</span>{fee.amount.toLocaleString()}
              </div>
            </div>
            
            <button 
              disabled={fee.paid}
              onClick={() => handlePay(fee.id)}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all mt-2
                ${fee.paid ? 'bg-black/50 text-green-500' : 'bg-green-600 hover:bg-green-500'}
              `}
            >
              {fee.paid ? <><CheckCircle2 size={18} /> Cleared</> : 'Pay with CCT'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
