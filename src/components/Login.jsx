import { useState } from 'react';
import { Fingerprint, Wallet } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

export default function Login({ onLogin }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { offset, handleMouseMove, handleMouseLeave } = useParallax(40);

  const handleLogin = () => {
    setIsConnecting(true);
    setTimeout(() => {
      onLogin();
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen bg-[#0E0F14] text-white flex justify-center items-center p-6 relative overflow-hidden w-full transition-transform ease-out duration-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background ambient light with Parallax */}
      <div 
        className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-[100px] pointer-events-none transition-transform ease-out duration-300"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      ></div>
      <div 
        className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none transition-transform ease-out duration-300"
        style={{ transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)` }}
      ></div>
      
      <div className="w-full max-w-sm flex flex-col items-center z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Logo / Splash Icon */}
        <div className="w-24 h-24 mb-6 rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px] shadow-[0_0_40px_rgba(139,92,246,0.5)]">
          <div className="w-full h-full bg-[#1A1C23] rounded-[1.35rem] flex items-center justify-center">
            <span className="font-black flex flex-col text-center leading-none">
              <span className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">CC</span>
              <span className="text-xl text-white">+</span>
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">CampusChain<span className="text-purple-500">+</span></h1>
        <p className="text-gray-400 font-medium text-center mb-12">Smart, Secure, & Rewarding Student Finance</p>

        {isConnecting ? (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <div className="w-12 h-12 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin mb-4 shadow-[0_0_20px_rgba(139,92,246,0.6)]"></div>
            <p className="text-purple-400 font-bold animate-pulse">Requesting Signature...</p>
          </div>
        ) : (
          <form className="w-full flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Student ID / Roll No.</label>
              <input 
                type="text" 
                placeholder="e.g. CS-2024-001" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-mono" 
                required 
              />
            </div>
            
            <div className="flex flex-col gap-1.5 text-left mb-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Portal Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-mono tracking-widest" 
                required 
              />
            </div>

            <button 
              type="submit"
              className="w-full p-4 rounded-xl flex items-center justify-center gap-2 font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all ring-1 ring-purple-500/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-[1.02]"
            >
              <Fingerprint size={20} className="text-white" />
              Secure Campus Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
