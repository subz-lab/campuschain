import { BrainCircuit, Cookie, Music, ShoppingBag, Sparkles, TrendingDown } from 'lucide-react';

export default function Insights() {
  const totalSpent = 850;
  const budget = 1000;
  
  const categories = [
    { name: 'Food & Dining', amount: 500, icon: Cookie, color: 'text-orange-400', bg: 'bg-orange-500/20', percent: 59 },
    { name: 'Events', amount: 200, icon: Music, color: 'text-purple-400', bg: 'bg-purple-500/20', percent: 23 },
    { name: 'Others', amount: 150, icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-500/20', percent: 18 },
  ];

  return (
    <div className="flex flex-col gap-6 pt-4 pb-24 animate-in fade-in zoom-in-95 duration-400">
      
      {/* Header Summary */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-bold">AI Insights</h2>
          <p className="text-gray-400 text-sm mt-1">Your weekly analysis</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
          <BrainCircuit size={24} className="text-blue-400" />
        </div>
      </div>

      {/* AI Smart Insight Card */}
      <div className="glass-panel p-5 relative overflow-hidden ring-1 ring-blue-500/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[40px] -translate-y-16 translate-x-16"></div>
        <div className="flex items-start gap-4 mb-3 relative z-10">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Sparkles size={20} className="text-white animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Smart Alert</h3>
            <p className="text-sm font-medium mt-1">You spent 59% (₹500) of your budget on Food this week.</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 mt-3 flex items-center gap-3">
          <TrendingDown size={20} className="text-green-400" />
          <p className="text-xs text-gray-300">Action: Try saving ₹200 more by cooking meals to increase your streak.</p>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-5 flex flex-col justify-center">
          <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">Total Spent</p>
          <div className="text-2xl font-bold flex items-baseline gap-1">
            <span className="text-xl">₹</span>{totalSpent}
          </div>
        </div>
        <div className="glass-panel p-5 flex flex-col justify-center">
          <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">Remaining</p>
          <div className="text-2xl font-bold text-green-400 flex items-baseline gap-1">
            <span className="text-xl">₹</span>{budget - totalSpent}
          </div>
        </div>
      </div>

      {/* Categories Breakdown */}
      <div>
        <h3 className="font-semibold text-lg mb-4 px-1">Spending Categories</h3>
        <div className="flex flex-col gap-3">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <div key={cat.name} className="glass-panel p-4 hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-center mb-2 text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${cat.bg}`}>
                      <Icon size={16} className={cat.color} />
                    </div>
                    {cat.name}
                  </div>
                  <div>₹{cat.amount}</div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${cat.bg.replace('/20', '')}`}
                      style={{ width: `${cat.percent}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{cat.percent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}
