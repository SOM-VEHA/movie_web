import { Play, Info, Star } from 'lucide-react';
import { Movie } from '../types';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

interface HeroProps {
  movie: Movie;
}

export function Hero({ movie }: HeroProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <header className="relative h-[480px] md:h-[580px] mx-8 mt-24 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
      <div className="absolute inset-0">
        <img 
          src={movie.bannerUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-red-600 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider italic">TRENDING</span>
            <span className="text-xs text-gray-300 font-medium">{movie.duration} • {movie.genre.join(' / ')}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none italic">
            {movie.title}
          </h1>

          <p className="text-gray-300 text-sm md:text-base max-w-md mb-8 leading-relaxed line-clamp-3 italic font-light">
            {movie.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to={`/movie/${movie.id}`}
              className="bg-white text-black font-black uppercase tracking-widest text-[11px] px-10 py-3.5 rounded flex items-center gap-3 hover:bg-gray-200 transition-all shadow-lg active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Now</span>
            </Link>
            <button 
              onClick={() => favorite ? removeFavorite(movie.id) : addFavorite(movie)}
              className="bg-white/10 backdrop-blur-md text-white font-black uppercase tracking-widest text-[11px] px-8 py-3.5 rounded border border-white/20 flex items-center gap-3 hover:bg-white/20 transition-all active:scale-95"
            >
              {favorite ? <Star className="w-4 h-4 fill-current text-yellow-500" /> : <Plus className="w-4 h-4" />}
              <span>{favorite ? 'In My List' : 'Add Favorites'}</span>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-8 flex items-center gap-4 text-[10px] text-white/40 font-bold tracking-[0.4em] uppercase italic">
        <div className="w-12 h-[1px] bg-white/10" />
        <span>CINEMATIC EXPERIENCE</span>
      </div>
    </header>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
  );
}
