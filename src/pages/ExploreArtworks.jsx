import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { artworksAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Fade } from 'react-awesome-reveal';
import { Tooltip } from 'react-tooltip';

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const categories = [
    'All',
    'Painting',
    'Digital Art',
    'Sculpture',
    'Photography',
    'Drawing',
    'Mixed Media',
    'Other',
  ];

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (category !== 'All') params.category = category;
        const response = await artworksAPI.getAll(params);
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchArtworks, 300);
    return () => clearTimeout(debounceTimer);
  }, [search, category]);

  if (loading && artworks.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        
        {/* Header */}
        <Fade triggerOnce>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white md:text-5xl">
              Explore Artworks
            </h1>
            <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400 md:text-lg">
              Discover amazing artworks from talented artists around the world
            </p>
          </div>
        </Fade>

        {/* Search and filter section */}
        <Fade triggerOnce delay={100}>
          <div className="surface-card" data-padding="compact">
            <div className="flex flex-col md:flex-row gap-4">
              
              {/* Search Input */}
              <div className="flex-1 relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search by title or artist..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-12 pr-4"
                />
              </div>

              {/* Category filter */}
              <div className="relative md:w-64">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field pl-12 pr-10 appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Results count */}
            {!loading && (
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {artworks.length === 0 ? (
                  <span>No artworks found</span>
                ) : (
                  <span>
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{artworks.length}</span> {artworks.length === 1 ? 'artwork' : 'artworks'}
                  </span>
                )}
              </div>
            )}
          </div>
        </Fade>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Empty state */}
        {!loading && artworks.length === 0 && (
          <Fade triggerOnce>
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl">
              <svg
                className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-700"
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No artworks found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filters to find what you're looking for
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setCategory('All');
                }}
                className="primary-btn"
              >
                Clear Filters
              </button>
            </div>
          </Fade>
        )}

        {/* Artworks grid */}
        {!loading && artworks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {artworks.map((artwork, index) => (
              <Fade key={artwork._id} triggerOnce delay={index * 50}>
                <div className="group overflow-hidden rounded-2xl border border-gray-200/70 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800/70 dark:bg-slate-900/80">
                  
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={artwork.imageURL}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white">
                      {artwork.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-brand dark:text-white">
                      {artwork.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Artist:</span> {artwork.artistName}
                    </p>

                    {/* Likes */}
                    <div className="flex items-center gap-2">
                      <span
                        data-tooltip-id={`likes-${artwork._id}`}
                        data-tooltip-content="Total Likes"
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-brand"
                      >
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">{artwork.likes || 0}</span>
                      </span>
                      <Tooltip id={`likes-${artwork._id}`} />
                    </div>

                    {/* View button */}
                    <Link to={`/artwork/${artwork._id}`} className="primary-btn w-full justify-center">
                      View Details
                    </Link>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreArtworks;