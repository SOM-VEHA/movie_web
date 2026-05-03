import { useFavorites } from '../context/FavoritesContext';
import { MovieCard } from '../components/MovieCard';
import { Heart, Film, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-16 container mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-gray-900 pb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-red-600 mb-2">
            <Heart className="w-6 h-6 fill-current" />
            <span className="text-xs font-black uppercase tracking-[0.4em] italic">Member Access</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
            Your <span className="text-red-600">Favorites</span>
          </h1>
          <p className="text-gray-500 max-w-lg italic font-light">
            A curated selection of the cinematic experiences you love most. Your personal collection for easy streaming.
          </p>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-6 rounded-2xl flex items-center gap-6">
          <div className="text-center">
            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Total Movies</span>
            <span className="text-3xl font-black text-white">{favorites.length}</span>
          </div>
          <div className="w-[1px] h-10 bg-gray-800" />
          <div className="text-center">
            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Avg Rating</span>
            <span className="text-3xl font-black text-red-600 italic">4.7</span>
          </div>
        </div>
      </header>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="relative mb-12">
            <div className="w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center animate-pulse">
              <Film className="text-gray-700 w-16 h-16" />
            </div>
            <Heart className="absolute -bottom-2 -right-2 w-12 h-12 text-gray-800" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 italic uppercase tracking-tighter">Your list is empty</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-10 italic font-light text-lg">
            Start building your collection by browsing our exclusive titles and clicking the heart icon.
          </p>
          <Link 
            to="/" 
            className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-black italic uppercase tracking-widest transition-all shadow-xl shadow-red-600/30"
          >
            Explore Movies
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}
