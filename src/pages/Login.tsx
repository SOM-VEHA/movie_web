import React from 'react';
import { Film, ArrowRight, Mail, Lock, ShieldCheck, Github } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Simple validation simulation
    if (email.includes('@') && password.length >= 6) {
      navigate('/');
    } else {
      setError('Invalid email or password (min 6 chars)');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black px-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1543533907-27b686274641?q=80&w=1920&h=1080&auto=format&fit=crop"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-red-950/30" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="bg-gray-950/60 backdrop-blur-2xl p-10 md:p-12 rounded-[40px] border border-white/5 shadow-[0_0_100px_rgba(220,38,38,0.1)]">
          <div className="flex flex-col items-center mb-10">
            <Link to="/" className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-red-600/40 rotate-12 hover:rotate-0 transition-all duration-500">
              <Film className="text-white w-8 h-8" />
            </Link>
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase text-center">
              Welcome <span className="text-red-600">Back</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-bold font-mono">
              The Stage is yours
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl flex items-center gap-2 italic"
              >
                <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-4 italic">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest ml-4 italic">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600/50 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black italic uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-600/20 mt-8"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
            <div className="flex items-center justify-center gap-4">
               <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
                 <Github className="w-4 h-4 text-white" />
                 <span className="text-xs text-white font-bold uppercase tracking-wider">Github</span>
               </button>
               <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
                 <ShieldCheck className="w-4 h-4 text-white" />
                 <span className="text-xs text-white font-bold uppercase tracking-wider">Google</span>
               </button>
            </div>
            <p className="text-center text-gray-600 text-xs font-light italic">
              Don't have an account? <span className="text-red-600 cursor-pointer font-bold hover:underline">Join the club</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
