import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Typewriter } from 'react-simple-typewriter';
import { Fade } from 'react-awesome-reveal';
import { artworksAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import topArtistImage from '../assets/topartist.webp';
import slide1 from '../assets/1.png';
import slide2 from '../assets/2.png';
import slide3 from '../assets/3.png';

const Home = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await artworksAPI.getFeatured();
        setFeaturedArtworks(response.data);
      } catch (error) {
        console.error('Error fetching featured artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const images = [
    { original: slide1, thumbnail: slide1 },
    { original: slide2, thumbnail: slide2 },
    { original: slide3, thumbnail: slide3 },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Full Width Banner Slider fix */}
      <section className="w-full">
        <Fade triggerOnce duration={800}>
          <div className="w-full">
            <div 
              className="hero-slider-container !rounded-none !shadow-none !p-0" 
              style={{ 
                height: 'auto',
                maxHeight: '845px'
              }}
            >
              <style>{`
                @media (min-width: 1024px) {
                  .hero-slider-container {
                    height: min(845px, calc(100vh - 80px)) !important;
                  }
                }
                @media (max-width: 1023px) {
                  .hero-slider-container {
                    height: auto !important;
                  }
                  .hero-slider-container .image-gallery {
                    height: auto !important;
                  }
                  .hero-slider-container .image-gallery-slide-wrapper,
                  .hero-slider-container .image-gallery-swipe,
                  .hero-slider-container .image-gallery-slides {
                    height: auto !important;
                  }
                  .hero-slider-container .image-gallery-slide {
                    height: auto !important;
                  }
                  .hero-slider-container .image-gallery-image {
                    height: auto !important;
                    width: 100%;
                    object-fit: contain;
                  }
                }
                @media (max-width: 767px) {
                  .hero-slider-container .image-gallery-image {
                    max-height: 50vh;
                    object-fit: cover;
                  }
                }
              `}</style>
              <ImageGallery
                items={images}
                showThumbnails={false}
                showFullscreenButton={false}
                showPlayButton={false}
                autoPlay={true}
                slideInterval={4000}
                slideDuration={800}
                showNav={true}
                additionalClass="hero-slider"
              />
            </div>
          </div>
        </Fade>
      </section>

      {/* Hero section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Fade triggerOnce duration={1000}>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              Welcome to{' '}
              <span className="text-brand inline-block">
                <Typewriter
                  words={['Artify', 'Creative Gallery', 'Art Showcase', 'Your Canvas']}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={60}
                  delaySpeed={1500}
                />
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Discover amazing artworks from talented artists around the world
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/explore"
                className="px-8 py-3 bg-brand text-black font-semibold rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-1 hover:bg-brand-dark hover:shadow-xl"
              >
                Explore Artworks
              </Link>
              <Link
                to="/add-artwork"
                className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-1 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 hover:shadow-xl"
              >
                Share Your Art
              </Link>
            </div>
          </div>
        </Fade>
      </section>

      {/* Featured artworks */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <Fade triggerOnce>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Artworks
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our curated collection of the most recent and stunning artworks
            </p>
          </div>
        </Fade>

        {featuredArtworks.length === 0 ? (
          <Fade triggerOnce>
            <div className="rounded-2xl bg-gray-50 py-16 text-center dark:bg-gray-900">
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                No featured artworks yet
              </p>
              <Link
                to="/add-artwork"
                className="inline-block rounded-lg bg-brand px-6 py-2 font-medium text-black transition-colors hover:bg-brand-dark"
              >
                Be the first to add one!
              </Link>
            </div>
          </Fade>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredArtworks.map((artwork, index) => (
              <Fade key={artwork._id} triggerOnce delay={index * 100}>
                <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                  <div className="relative overflow-hidden aspect-4/3">
                    <img
                      src={artwork.imageURL}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {artwork.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                      <span className="font-medium">Artist:</span> {artwork.artistName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      <span className="font-medium">Category:</span> {artwork.category}
                    </p>
                    <Link
                      to={`/artwork/${artwork._id}`}
                      className="block w-full rounded-lg bg-brand px-4 py-2.5 text-center font-semibold text-black transition-all duration-300 shadow-md hover:bg-brand-dark hover:shadow-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        )}
      </section>

      {/* Top artist hard data*/}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Fade triggerOnce>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Top Artist of the Week
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Celebrating excellence in contemporary art
              </p>
            </div>
          </Fade>

          <Fade triggerOnce delay={200}>
            <div className="max-w-md mx-auto">
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                <div className="relative overflow-hidden aspect-4/3">
                  <img
                    src={topArtistImage}
                    alt="Cy Twombly"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute right-4 top-4 rounded-full bg-brand px-4 py-2 text-sm font-bold text-black shadow-lg">
                    ⭐ Top Artist
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Cy Twombly
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    A renowned artist known for his large-scale, freely scribbled, calligraphic-style
                    graffiti paintings that blend poetry and visual art.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Community highlights */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <Fade triggerOnce>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Community Highlights
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Join our vibrant community of artists and art enthusiasts
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: '🌟',
              title: 'Creative Excellence',
              text: 'Join thousands of artists showcasing their creative works and inspiring others worldwide.',
            },
            {
              icon: '🎨',
              title: 'Diverse Collection',
              text: 'Explore artworks across various categories including painting, digital art, sculpture, and more.',
            },
            {
              icon: '💝',
              title: 'Share & Connect',
              text: 'Like, favorite, and connect with artists. Build your own gallery and share your passion.',
            },
          ].map((item, i) => (
            <Fade triggerOnce delay={100 * (i + 1)} key={i}>
              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
                  <span className="text-4xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.text}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;