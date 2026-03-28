import { ScanLine, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function PayQR() {
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanned(true);
    setTimeout(() => setScanned(false), 3000);
  };

  if (scanned) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 mb-2">QR Scanned!</h2>
        <p className="text-gray-400">₹150 sent to Cafe Coffee Day.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-4 pb-24 animate-in slide-in-from-right duration-300">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">Scan to Pay</h2>
        <p className="text-sm text-gray-400 mt-1">Point your camera at a Campus merchant QR</p>
      </div>

      {/* Fake Camera View */}
      <div className="glass-panel w-full aspect-square flex flex-col items-center justify-center relative overflow-hidden bg-black ring-2 ring-blue-500/50 cursor-pointer group" onClick={handleScan}>
        <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
        
        {/* Scanning Line Animation */}
        <div className="absolute top-0 w-full h-[2px] bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,1)] animate-pulse"
             style={{ animation: 'scan 2s linear infinite' }}></div>
             
        <ScanLine size={64} className="text-blue-500/40 group-hover:text-blue-400 transition-colors" />
        <p className="mt-4 text-xs font-semibold text-blue-400 uppercase tracking-widest">Tap to Simulate Scan</p>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}} />

      <div className="glass-panel p-4 text-center mt-4">
        <p className="font-semibold text-sm">Or upload from Gallery</p>
      </div>
    </div>
  );
}
