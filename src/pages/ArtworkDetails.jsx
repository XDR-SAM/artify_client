import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { artworksAPI, favoritesAPI, artistsAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';

const ArtworkDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [artwork, setArtwork] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await artworksAPI.getById(id);
        setArtwork(response.data);
        setLikes(response.data.likes || 0);

        // Fetch artist info
        const artistResponse = await artistsAPI.getByEmail(response.data.userEmail);
        setArtist(artistResponse.data);
      } catch (err) {
        console.error('Error fetching artwork:', err);
        toast.error('Error loading artwork');
        navigate('/explore');
      } finally {
        setLoading(false);
      }
    };

    const checkFavorite = async () => {
      try {
        const favorites = await favoritesAPI.getAll();
        setIsFavorite(favorites.data.some((fav) => fav._id === id));
      } catch (err) {
        console.error('Error checking favorites:', err);
      }
    };

    if (id) {
      fetchArtwork();
      if (user) {
        checkFavorite();
      }
    }
  }, [id, user, navigate]);

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like artworks');
      return;
    }

    try {
      const action = isLiked ? 'unlike' : 'like';
      const response = await artworksAPI.like(id, action);
      const newLikedState = !isLiked;
      setLikes(response.data.likes);
      setIsLiked(newLikedState);
      toast.success(newLikedState ? 'Liked! ❤️' : 'Like removed');
    } catch (err) {
      toast.error('Error updating like');
      console.error('Like error:', err);
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      toast.error('Please login to add favorites');
      return;
    }

    try {
      if (isFavorite) {
        await favoritesAPI.remove(id);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await favoritesAPI.add(id);
        setIsFavorite(true);
        toast.success('Added to favorites ⭐');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating favorites');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl text-gray-500 dark:text-gray-400">Artwork not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        
        {/* Back Button */}
        <Fade triggerOnce>
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[#f3b519] dark:hover:text-[#f3b519] transition-colors group"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </Fade>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left: Image */}
          <Fade triggerOnce>
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-900">
                  <img
                    src={artwork.imageURL}
                    alt={artwork.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
                
                {/* Like & Favorite Buttons - Mobile */}
                <div className="lg:hidden mt-6 flex gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                      isLiked
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={isLiked ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{likes}</span>
                  </button>
                  
                  <button
                    onClick={handleFavorite}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                      isFavorite
                        ? 'bg-[#f3b519] text-black hover:bg-[#d9a515]'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={isFavorite ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <span>{isFavorite ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>
            </div>
          </Fade>

          {/* Right: Details */}
          <Fade triggerOnce delay={100}>
            <div>
              
              {/* Title & Category */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-4 py-1.5 bg-[#f3b519]/10 text-[#f3b519] rounded-full text-sm font-semibold">
                    {artwork.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {artwork.title}
                </h1>
              </div>

              {/* Details Grid */}
              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Artist</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{artwork.artistName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Medium</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{artwork.medium}</p>
                  </div>
                </div>

                {artwork.dimensions && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Dimensions</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{artwork.dimensions}</p>
                    </div>
                  </div>
                )}

                {artwork.price && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                      <p className="text-2xl font-bold text-[#f3b519]">${artwork.price}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              {/* Like & Favorite Buttons - Desktop */}
              <div className="hidden lg:flex gap-4 mb-8">
                <button
                  onClick={handleLike}
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                    isLiked
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill={isLiked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-lg">{likes} Likes</span>
                </button>

                <button
                  onClick={handleFavorite}
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                    isFavorite
                      ? 'bg-[#f3b519] text-black hover:bg-[#d9a515]'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill={isFavorite ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <span className="text-lg">{isFavorite ? 'Saved' : 'Save to Favorites'}</span>
                </button>
              </div>

              {/* Artist Information */}
              {artist && (
                <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    About the Artist
                  </h3>
                  <div className="flex items-center gap-4">
                    {artist.photoURL && (
                      <img
                        src={artist.photoURL}
                        alt={artist.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                      />
                    )}
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{artist.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {artist.totalArtworks} {artist.totalArtworks === 1 ? 'Artwork' : 'Artworks'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;