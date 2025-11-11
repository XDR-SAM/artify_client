import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { favoritesAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';

const MyFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await favoritesAPI.getAll();
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Error loading favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (artworkId) => {
    if (!window.confirm('Are you sure you want to remove this from favorites?')) {
      return;
    }

    try {
      await favoritesAPI.remove(artworkId);
      toast.success('Removed from favorites');
      fetchFavorites();
    } catch (error) {
      toast.error('Error removing from favorites');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-12 md:py-16">
        
        {/* Header */}
        <Fade triggerOnce>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f3b519]/10 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-[#f3b519]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              My Favorites
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {favorites.length === 0
                ? 'Your collection of favorite artworks'
                : `${favorites.length} ${favorites.length === 1 ? 'artwork' : 'artworks'} saved`}
            </p>
          </div>
        </Fade>

        {/* Empty state */}
        {favorites.length === 0 ? (
          <Fade triggerOnce>
            <div className="max-w-md mx-auto text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full mb-6">
                <svg
                  className="w-10 h-10 text-gray-400 dark:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No Favorites Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 px-6">
                Start exploring artworks and save your favorites to see them here
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f3b519] text-black font-semibold rounded-xl hover:bg-[#d9a515] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Explore Artworks</span>
              </Link>
            </div>
          </Fade>
        ) : (
          /* Artworks grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {favorites.map((artwork, index) => (
              <Fade key={artwork._id} triggerOnce delay={index * 50}>
                <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                  
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={artwork.imageURL}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Favorite badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-[#f3b519] text-black p-2 rounded-full shadow-lg">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white">
                      {artwork.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-[#f3b519] transition-colors">
                      {artwork.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Artist:</span> {artwork.artistName}
                    </p>

                    {/* Likes */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">{artwork.likes || 0}</span>
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Link
                        to={`/artwork/${artwork._id}`}
                        className="flex-1 text-center px-4 py-2.5 bg-[#f3b519] text-black font-semibold rounded-lg hover:bg-[#d9a515] transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleRemoveFavorite(artwork._id)}
                        className="px-4 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                        title="Remove from favorites"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;