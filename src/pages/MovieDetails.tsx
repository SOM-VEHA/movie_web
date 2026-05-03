import { useParams, Link } from 'react-router-dom';
import { MOVIES } from '../data/movies';
import { Star, Clock, Calendar, Check, Play, Heart, Share2, Info, X } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MovieRow } from '../components/MovieRow';
import { useFavorites } from '../context/FavoritesContext';
import { cn } from '../util';

export function MovieDetails() {
  const { id } = useParams();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isPlaying, setIsPlaying] = useState(false);
  const movie = MOVIES.find(m => m.id === id);
  
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <h1 className="text-white text-2xl font-bold font-serif italic">Movie not found</h1>
      </div>
    );
  }

  const favorite = isFavorite(movie.id);
  const relatedMovies = MOVIES.filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g)));

  return (
    <div className="min-h-screen bg-black pb-20 selection:bg-red-600 selection:text-white">
      {/* Player Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={() => setIsPlaying(false)}
              className="absolute top-8 right-8 text-white hover:text-red-500 transition-colors z-10 p-2 bg-white/5 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative"
            >
              {/* Using a placeholder for trailer */}
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Movie Trailer" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              <div className="absolute top-4 left-6 pointer-events-none">
                <span className="text-white font-black italic uppercase tracking-tighter text-xl bg-black/40 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                  NOW PLAYING: {movie.title}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Banner */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={movie.bannerUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded tracking-[0.2em] italic shadow-lg shadow-red-600/30">CINEMA EXCLUSIVE</span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-white text-sm font-black italic">{movie.rating}</span>
              </div>
            </div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-6 line-clamp-2 leading-[0.9]"
            >
              {movie.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base font-bold italic mb-10">
               <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-red-500" /> {movie.duration}</span>
               <span className="w-1 h-1 bg-gray-700 rounded-full" />
               <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-red-500" /> {movie.releaseDate}</span>
               <span className="w-1 h-1 bg-gray-700 rounded-full" />
               <div className="flex gap-2">
                 {movie.genre.map(g => (
                   <span key={g} className="px-3 py-0.5 bg-white/5 border border-white/10 rounded uppercase tracking-tighter text-[10px] font-black text-gray-300 italic">{g}</span>
                 ))}
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setIsPlaying(true)}
                className="bg-white text-black px-10 md:px-14 py-4 rounded font-black italic uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-gray-200 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] text-sm"
              >
                <Play className="w-5 h-5 fill-current" />
                WATCH NOW
              </button>
              <button 
                onClick={() => favorite ? removeFavorite(movie.id) : addFavorite(movie)}
                className={cn(
                  "px-8 md:px-10 py-4 rounded font-black italic uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 border text-sm",
                  favorite 
                    ? "bg-red-600 border-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)]" 
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                )}
              >
                {favorite ? <Star className="w-5 h-5 fill-current text-white" /> : <PlusIcon className="w-5 h-5" />}
                {favorite ? 'MY LIST' : 'ADD LIST'}
              </button>
              <button className="p-4 bg-white/5 border border-white/10 rounded text-white hover:bg-white/10 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Info */}
      <section className="px-6 md:px-16 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3 italic">
              <span className="w-8 h-[1px] bg-red-600" />
              Synopsis
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light italic">
              {movie.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Director', value: 'Christopher Nolan' },
              { label: 'Writer', value: 'Jonathan Nolan' },
              { label: 'Studio', value: 'Warner Bros. Pictures' },
              { label: 'Country', value: 'United States' }
            ].map(item => (
              <div key={item.label}>
                <span className="block text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-1">{item.label}</span>
                <span className="text-gray-300 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          
          <div className="p-8 bg-gray-900/50 rounded-3xl border border-gray-800">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-red-500" />
              Why Watch This?
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Critically acclaimed direction and cinematography',
                'Engaging storyline with deep emotional resonance',
                'Stunning visual effects and production design',
                'Award-winning performances by the lead cast'
              ].map(point => (
                <li key={point} className="flex items-start gap-2 text-sm text-gray-400 italic">
                  <Check className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-red-500 font-black italic tracking-widest uppercase mb-1 block">Cast Spotlight</span>
                <span className="text-white font-bold leading-tight">Leonardo DiCaprio<br/>Cillian Murphy</span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Related Movies */}
      <div className="mt-20">
        <MovieRow title="More Like This" movies={relatedMovies} />
      </div>
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
