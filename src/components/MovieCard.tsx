import React from 'react';
import { Star, Play, Heart } from 'lucide-react';
import { Movie } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useFavorites } from '../context/FavoritesContext';
import { cn } from '../util';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group w-[180px] md:w-[200px] cursor-pointer"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105 border border-white/5 shadow-lg">
        <Link to={`/movie/${movie.id}`} className="block w-full h-full">
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        <div className="absolute top-2 right-2 z-10">
          <button 
            onClick={toggleFavorite}
            className={cn(
              "p-1.5 rounded-full bg-black/50 backdrop-blur-sm transition-colors group/fav",
              favorite && "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
            )}
          >
            <Heart className={cn("w-3.5 h-3.5 text-white", favorite && "fill-current")} />
          </button>
        </div>

        <Link to={`/movie/${movie.id}`} className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-4 scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            <Play className="w-6 h-6 text-white fill-current" />
          </div>
          <div className="w-full py-2 bg-white text-[10px] font-black rounded text-black text-center transition-transform uppercase tracking-widest active:scale-95 italic">
            QUICK VIEW
          </div>
        </Link>
      </div>
      
      <Link to={`/movie/${movie.id}`} className="block">
        <h3 className="text-[11px] font-black truncate group-hover:text-red-500 transition-colors uppercase tracking-tight italic">
          {movie.title}
        </h3>
        <div className="flex items-center space-x-1 text-[10px] text-gray-500 font-bold italic mt-0.5">
          <span className="text-yellow-500">★★★★☆</span>
          <span className="font-mono">({movie.rating})</span>
        </div>
      </Link>
    </motion.div>
  );
}
