import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { artworksAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ArtworkCard from '../components/ArtworkCard';
import SkeletonCard from '../components/SkeletonCard';
import { Fade } from 'react-awesome-reveal';
import { Tooltip } from 'react-tooltip';

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent'); // recent, likes, title
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

  // Sort artworks
  const sortedArtworks = [...artworks].sort((a, b) => {
    switch (sortBy) {
      case 'likes':
        return (b.likes || 0) - (a.likes || 0);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'recent':
      default:
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArtworks = sortedArtworks.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortBy]);

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

              {/* Sort dropdown */}
              <div className="relative md:w-48">
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
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field pl-12 pr-10 appearance-none cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="likes">Most Liked</option>
                  <option value="title">Title (A-Z)</option>
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
              <div className="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <div>
                  {sortedArtworks.length === 0 ? (
                    <span>No artworks found</span>
                  ) : (
                    <span>
                      Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedArtworks.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{sortedArtworks.length}</span> {sortedArtworks.length === 1 ? 'artwork' : 'artworks'}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </Fade>

        {/* Loading state with skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(12)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && sortedArtworks.length === 0 && (
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
        {!loading && paginatedArtworks.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {paginatedArtworks.map((artwork, index) => (
                <Fade key={artwork._id} triggerOnce delay={index * 30}>
                  <ArtworkCard artwork={artwork} />
                </Fade>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Fade triggerOnce>
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === pageNum
                                ? 'bg-brand text-black'
                                : 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return <span key={pageNum} className="px-2 py-2 text-gray-500">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </Fade>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ExploreArtworks;