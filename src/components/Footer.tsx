import { Film, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="px-8 py-6 border-t border-white/5 bg-zinc-950 flex flex-col md:flex-row justify-between items-center gap-6 mt-16">
      <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[10px] text-gray-500 font-black tracking-[0.2em] uppercase italic">
        <span>© 2026 CINEFLIX INC.</span>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Help Center</a>
      </div>
      <div className="flex items-center space-x-3 bg-white/5 px-5 py-2 rounded-full border border-white/5 shadow-inner">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
        <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] italic">Service Operational</span>
      </div>
    </footer>
  );
}
