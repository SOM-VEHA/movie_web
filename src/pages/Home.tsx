import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOVIES } from '../data/movies';
import { Hero } from '../components/Hero';
import { MovieRow } from '../components/MovieRow';
import { Filter, Search as SearchIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MovieCard } from '../components/MovieCard';
import { cn } from '../util';

export function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const popularMovies = MOVIES.filter(m => m.category === 'Popular');
  const actionMovies = MOVIES.filter(m => m.genre.includes('Action'));
  const horrorMovies = MOVIES.filter(m => m.genre.includes('Horror'));
  const romanceMovies = MOVIES.filter(m => m.genre.includes('Romance'));
  const comedyMovies = MOVIES.filter(m => m.genre.includes('Comedy'));

  const filteredMovies = searchQuery 
    ? MOVIES.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  if (searchQuery) {
    return (
      <div className="pt-24 pb-20 px-6 md:px-16 min-h-screen">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600/10 rounded-xl">
              <SearchIcon className="text-red-600 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Search Results</h1>
              <p className="text-gray-500 text-sm">Showing results for "{searchQuery}"</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg hover:border-gray-700 transition-all">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-bold">Filter</span>
          </button>
        </div>

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            <AnimatePresence>
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6">
              <SearchIcon className="text-gray-700 w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 italic uppercase">No matches found</h2>
            <p className="text-gray-500 max-w-sm">We couldn't find any movies matching your search. Try different keywords or browse our categories.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <Hero movie={MOVIES[0]} />
      
      <div className="relative z-20 pb-20 bg-black">
        <MovieRow title="Popular Now" movies={popularMovies} />
        
        {/* Category Tags Section */}
        <section className="px-8 md:px-16 py-8 overflow-hidden">
          <div className="flex items-center space-x-6 pb-2 scrollbar-hide overflow-x-auto">
            <span className="text-[10px] uppercase font-black text-gray-500 tracking-[0.3em] whitespace-nowrap italic">Explore Genres</span>
            <div className="flex space-x-3">
              {['ACTION', 'COMEDY', 'HORROR', 'ROMANCE', 'DRAMA', 'SCI-FI', 'THRILLER'].map((cat) => (
                <button 
                  key={cat}
                  className={cn(
                    "px-6 py-2 rounded-full text-[11px] font-black tracking-widest transition-all whitespace-nowrap active:scale-95",
                    cat === 'ACTION' 
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                      : "bg-white/5 hover:bg-white/10 text-gray-400 border border-white/5"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <MovieRow title="Latest Thrillers" movies={actionMovies} />
        <MovieRow title="Romantic Escapes" movies={romanceMovies} />
        <MovieRow title="Chilling Horror" movies={horrorMovies} />
        <MovieRow title="Must Watch Comedy" movies={comedyMovies} />
      </div>
    </div>
  );
}
