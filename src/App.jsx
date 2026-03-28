import { useState } from 'react';
import { Home, Send, PieChart, Trophy, ShieldAlert } from 'lucide-react';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import Insights from './components/Insights';
import Rewards from './components/Rewards';
import Admin from './components/Admin';
import PayQR from './components/PayQR';
import Fees from './components/Fees';
import Events from './components/Events';
import Login from './components/Login';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'send', label: 'Send', icon: Send },
    { id: 'insights', label: 'Insights', icon: PieChart },
    { id: 'rewards', label: 'Rewards', icon: Trophy },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard onNavigate={setActiveTab} />;
      case 'send': return <SendMoney />;
      case 'insights': return <Insights />;
      case 'rewards': return <Rewards />;
      case 'admin': return <Admin />;
      case 'payqr': return <PayQR />;
      case 'fees': return <Fees />;
      case 'events': return <Events />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0E0F14] text-white flex justify-center">
      {/* Mobile container to simulate app layout on desktop */}
      <div className="w-full max-w-md relative pb-20 overflow-x-hidden min-h-screen flex flex-col">
        
        {/* Header - Simple User Profile */}
        <header className="p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
              <div className="w-full h-full bg-[#1A1C23] rounded-full flex items-center justify-center">
                <span className="font-bold text-sm">JS</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400">Welcome back,</p>
              <h1 className="font-semibold text-sm">Jane Student</h1>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('admin')}
            className={`p-2 rounded-full transition-colors ${activeTab === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <ShieldAlert size={20} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-4 relative z-0">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-md bg-[#1A1C23]/90 backdrop-blur-xl border-t border-white/5 px-6 py-4 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <ul className="flex justify-between items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className="flex flex-col items-center gap-1 group relative transition-all"
                  >
                    <div className={`p-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-purple-500/20 text-purple-400 -translate-y-2' : 'text-gray-500 hover:text-gray-300 group-hover:bg-white/5'}`}>
                      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    {isActive && (
                      <span className="absolute -bottom-2 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
