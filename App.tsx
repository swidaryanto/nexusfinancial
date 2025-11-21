import React from 'react';
import ParticleBackground from './components/ui/ParticleBackground';
import LoginForm from './components/LoginForm';
import { Gem } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans selection:bg-brand-500/30 selection:text-brand-200">
      {/* Background Canvas */}
      <ParticleBackground />

      {/* Content Container */}
      <div className="relative w-full max-w-md px-6 z-10">
        
        {/* Header/Logo Area */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-center mb-4">
            <div className="relative p-3 rounded-2xl bg-slate-900/80 border border-slate-700 shadow-[0_0_40px_-10px_rgba(14,165,233,0.3)] backdrop-blur-xl">
               <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-500/20 to-transparent opacity-50"></div>
               <Gem className="w-10 h-10 text-brand-400 relative z-10" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Nexus <span className="text-brand-400">Financial</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Secure access for internal banking operations
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-8 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-700 delay-150 ring-1 ring-white/5">
           {/* Subtle top gradient line for aesthetic pop */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
           
           <LoginForm />
           
           <div className="mt-8 text-center">
             <p className="text-xs text-slate-600">
               Protected by enterprise-grade encryption. <br/>
               Unauthorized access is prohibited.
             </p>
           </div>
        </div>
        
        {/* Footer Info */}
        <div className="mt-8 text-center flex justify-center gap-6 text-xs text-slate-500 animate-in fade-in delay-300">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Help Center</a>
        </div>

      </div>
    </div>
  );
};

export default App;