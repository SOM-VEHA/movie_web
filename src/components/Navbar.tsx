import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, Film } from 'lucide-react';
import { cn } from '../util';
import { useFavorites } from '../context/FavoritesContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-4 flex items-center justify-between",
        isScrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/5 py-3" : "bg-gradient-to-b from-black/90 to-transparent"
      )}
    >
      <div className="flex items-center gap-10">
        <Link to="/" className="text-red-600 font-black text-3xl tracking-tighter hover:scale-105 transition-transform active:scale-95">
          CINEFLIX
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={cn("text-sm font-medium transition-colors hover:text-red-600", isActive('/') ? "text-white" : "text-gray-400")}>Home</Link>
          <Link to="/movies" className={cn("text-sm font-medium transition-colors hover:text-red-600", isActive('/movies') ? "text-white" : "text-gray-400")}>Movies</Link>
          <Link to="/series" className={cn("text-sm font-medium transition-colors hover:text-red-600", isActive('/series') ? "text-white" : "text-gray-400")}>Series</Link>
          <Link to="/favorites" className={cn("text-sm font-medium transition-colors hover:text-red-600 flex items-center gap-2", isActive('/favorites') ? "text-white" : "text-gray-400")}>
            Favorites
            {favorites.length > 0 && (
              <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <form onSubmit={handleSearch} className="relative hidden sm:block">
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-full py-2 px-10 text-xs w-48 md:w-64 focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-black/40 transition-all placeholder:text-gray-500 text-white"
          />
          <Search className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </form>

        <Link 
          to="/login" 
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-95"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
