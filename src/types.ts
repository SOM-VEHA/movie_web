export interface Movie {
  id: string;
  title: string;
  description: string;
  rating: number;
  duration: string;
  genre: string[];
  releaseDate: string;
  posterUrl: string;
  bannerUrl: string;
  category: 'Popular' | 'Latest' | 'Action' | 'Comedy' | 'Horror' | 'Romance';
}

export interface User {
  email: string;
}
