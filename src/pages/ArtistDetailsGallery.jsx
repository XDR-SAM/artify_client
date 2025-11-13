import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { artworksAPI, artistsAPI } from '../utils/api';

const ArtistDetailsGallery = () => {
  const { email: encodedEmail } = useParams();
  const navigate = useNavigate();
  const decodedEmail = useMemo(() => decodeURIComponent(encodedEmail || ''), [encodedEmail]);

  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!decodedEmail) {
      setError('Artist not found');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchArtistGallery = async () => {
      setLoading(true);
      setError(null);

      try {
        const [artistResponse, artworksResponse] = await Promise.all([
          artistsAPI.getByEmail(decodedEmail),
          artworksAPI.getAll({ userEmail: decodedEmail, visibility: 'Public' }),
        ]);

        if (!isMounted) return;

        setArtist(artistResponse.data || null);
        const data = Array.isArray(artworksResponse.data) ? artworksResponse.data : [];
        setArtworks(data);
      } catch (err) {
        console.error('Error fetching artist gallery:', err);
        if (!isMounted) return;
        setError('Unable to load this artist right now.');
        toast.error(err.response?.data?.message || 'Unable to load artist gallery');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArtistGallery();

    return () => {
      isMounted = false;
    };
  }, [decodedEmail]);

  const publicArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      const matchesArtist = decodedEmail ? artwork.userEmail === decodedEmail : true;
      const visibility = artwork.visibility ? artwork.visibility.toLowerCase() : 'public';
      const isPublic = visibility === 'public';
      return matchesArtist && isPublic;
    });
  }, [artworks, decodedEmail]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
            <svg className="w-16 h-16 mx-auto mb-6 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Artist Not Available</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{error || 'We could not find the artist you were looking for.'}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Go Back
              </button>
              <Link
                to="/explore"
                className="px-6 py-3 rounded-xl bg-brand text-black font-semibold hover:bg-[#d9a515] transition-all"
              >
                Explore Artworks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Fade triggerOnce>
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </Fade>

        <Fade triggerOnce delay={50}>
          <div className="surface-card mb-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start lg:items-center">
              {artist.photoURL && (
                <div className="shrink-0 w-32 h-32 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 shadow-lg">
                  <img src={artist.photoURL} alt={artist.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {artist.name || 'Artist Gallery'}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    {artist.bio || artist.tagline || 'Discover the public artworks shared by this artist.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 text-brand px-4 py-2 text-sm font-semibold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>{publicArtworks.length} {publicArtworks.length === 1 ? 'Public Artwork' : 'Public Artworks'}</span>
                  </div>
                  {artist.totalArtworks !== undefined && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                      </svg>
                      <span>Total Artworks: {artist.totalArtworks}</span>
                    </div>
                  )}
                  {artist.location && (
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5s1.343 3.5 3 3.5zm0 0c-3 0-6 1.5-6 4.5V20h12v-4.5c0-3-3-4.5-6-4.5z" />
                      </svg>
                      <span>{artist.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fade>

        {publicArtworks.length === 0 ? (
          <Fade triggerOnce delay={100}>
            <div className="max-w-xl mx-auto text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full mb-6">
                <svg className="w-10 h-10 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 4.34V21" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No Public Artworks Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 px-6">
                This artist hasn&apos;t shared any public artworks yet. Check back soon to explore their creations.
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:bg-[#d9a515] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Explore Other Artists
              </Link>
            </div>
          </Fade>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {publicArtworks.map((artwork, index) => (
              <Fade key={artwork._id} triggerOnce delay={index * 50}>
                <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
                  <div className="relative overflow-hidden aspect-4/3">
                    <img
                      src={artwork.imageURL}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white">
                      {artwork.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                        {artwork.title}
                      </h3>
                      {artwork.medium && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Medium: <span className="font-medium text-gray-700 dark:text-gray-300">{artwork.medium}</span>
                        </p>
                      )}
                    </div>

                    {artwork.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {artwork.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-medium">{artwork.likes || 0}</span>
                      </span>
                      {artwork.price && (
                        <span className="font-semibold text-brand">${artwork.price}</span>
                      )}
                    </div>

                    <Link
                      to={`/artwork/${artwork._id}`}
                      className="block text-center px-4 py-3 bg-brand text-black font-semibold rounded-lg hover:bg-[#d9a515] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      View Artwork
                    </Link>
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

export default ArtistDetailsGallery;

