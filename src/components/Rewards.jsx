import { Trophy, Star, Medal, Zap, ShieldCheck, Gift, ArrowRight, Flame, Crown } from 'lucide-react';
import { useState } from 'react';
import { useParallax } from '../hooks/useParallax';

export default function Rewards() {
  const [points, setPoints] = useState(1240);
  const { offset, rotate, handleMouseMove, handleMouseLeave } = useParallax(15);
  const [claimedStreak, setClaimedStreak] = useState(false);
  const level = "Silver";
  const progressPercent = 65;

  const handleClaimStreak = () => {
    setClaimedStreak(true);
    setPoints(p => p + 50);
  };

  const achievements = [
    { title: "Smart Spender", desc: "Under budget for 3 weeks", icon: ShieldCheck, color: "text-green-400", unlocked: true, claimed: true },
    { title: "Event Explorer", desc: "Attended 5 campus events", icon: Star, color: "text-yellow-400", unlocked: true, claimed: true },
    { title: "Budget Master", desc: "Zero food overspending for a month", icon: Medal, color: "text-purple-400", unlocked: false, claimed: false },
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", points: 3450, isUser: false },
    { rank: 2, name: "Sarah Smith", points: 2800, isUser: false },
    { rank: 3, name: "Jane Student (You)", points: points, isUser: true },
  ];

  const storeItems = [
    { title: "Free Campus Coffee", cost: 500, icon: Gift, color: "bg-orange-500/20 text-orange-400" },
    { title: "10% Off Library Fine", cost: 1000, icon: Gift, color: "bg-blue-500/20 text-blue-400" },
  ];

  return (
    <div className="flex flex-col gap-6 pt-4 pb-24 animate-in slide-in-from-bottom-8 duration-500">
      
      {/* Top Banner */}
      <div className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-500">
            {points.toLocaleString()} PTS
          </h2>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">{level} Member</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center ring-1 ring-yellow-500/50">
          <Trophy size={24} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
        </div>
      </div>

      {/* Level Progress */}
      <div 
        className="glass-panel p-5 relative overflow-hidden ring-1 ring-white/10 transition-transform ease-out duration-300"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)` }}
      >
        <div 
          className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[50px] transition-transform ease-out duration-300"
          style={{ transform: `translate3d(${-offset.x * 2}px, ${-offset.y * 2}px, 0)` }}
        ></div>
        
        <div className="flex justify-between items-end mb-3 relative z-10 pointer-events-none transition-transform ease-out duration-300" style={{ transform: `translate3d(${offset.x / 2}px, ${offset.y / 2}px, 0)` }}>
          <div>
            <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Next Level</p>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">Gold Tier <Crown size={16} className="text-yellow-400" /></h3>
          </div>
          <div className="text-right">
            <p className="text-xs text-purple-400 font-medium">360 pts needed</p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div 
          className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 relative z-10 pointer-events-none transition-transform ease-out duration-300"
          style={{ transform: `translate3d(${offset.x / 1.5}px, ${offset.y / 1.5}px, 0)` }}
        >
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 rounded-full transition-all duration-1000"
            style={{ transform: `translate3d(${offset.x / 1.5}px, ${offset.y / 1.5}px, 0)`, width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Daily Task / Streak */}
      <div className="glass-panel p-1 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-0">
        <div className="bg-[#1A1C23]/80 rounded-[0.9rem] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${claimedStreak ? 'bg-gray-500/20' : 'bg-yellow-500/20 animate-pulse'}`}>
              <Flame size={20} className={claimedStreak ? 'text-gray-500' : 'text-yellow-400'} />
            </div>
            <div>
              <h4 className="font-bold text-sm">4 Day Streak!</h4>
              <p className="text-xs text-gray-400">Log in tomorrow for 100 pts</p>
            </div>
          </div>
          <button 
            disabled={claimedStreak}
            onClick={handleClaimStreak}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${claimedStreak ? 'bg-black/50 text-gray-500' : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:scale-105 shadow-[0_0_15px_rgba(245,158,11,0.4)]'}`}
          >
            {claimedStreak ? 'Claimed' : '+50 Claim'}
          </button>
        </div>
      </div>

      {/* Redeem Store */}
      <div>
        <div className="flex justify-between items-center px-1 mb-3">
          <h3 className="font-semibold">Rewards Store</h3>
          <span className="text-xs text-blue-400">View All</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
          {storeItems.map((item, i) => (
            <div key={i} className="glass-panel p-4 min-w-[160px] snap-center flex flex-col gap-3 shrink-0 cursor-pointer hover:bg-white/5 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                <p className="text-xs text-blue-400 font-bold mt-1 inline-block bg-blue-500/10 px-2 py-0.5 rounded">{item.cost} PTS</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Leaderboard */}
      <div className="glass-panel p-4">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Top Savers this Week</h3>
        <div className="flex flex-col gap-3">
          {leaderboard.map(user => (
            <div key={user.rank} className={`flex items-center justify-between p-2 rounded-lg ${user.isUser ? 'bg-purple-500/10 ring-1 ring-purple-500/30' : ''}`}>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold w-4 text-center ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-300' : 'text-orange-400'}`}>
                  {user.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className={`text-sm ${user.isUser ? 'font-bold text-white' : 'font-medium text-gray-300'}`}>{user.name}</span>
              </div>
              <span className="text-sm font-bold text-yellow-400">{user.points.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements List */}
      <div>
        <h3 className="text-lg font-semibold mb-3 px-1">Badges</h3>
        <div className="grid grid-cols-1 gap-3">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div key={ach.title} className={`glass-panel p-4 flex items-center gap-4 transition-all ${!ach.unlocked ? 'opacity-50 grayscale' : ''}`}>
                <div className={`p-3 rounded-full ${ach.unlocked ? 'bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'bg-black/50'}`}>
                  <Icon size={24} className={ach.unlocked ? ach.color : 'text-gray-500'} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-sm ${ach.unlocked ? 'text-white' : 'text-gray-400'}`}>
                    {ach.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">{ach.desc}</p>
                </div>
                {ach.unlocked && ach.claimed && (
                  <div className="bg-green-500/20 text-green-400 text-[10px] uppercase font-bold px-2 py-1 rounded">Claimed</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
