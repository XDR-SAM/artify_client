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
      {/* ========================================= */}
      {/* EXISTING SECTIONS (KEPT INTACT)           */}
      {/* ========================================= */}
      
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

      {/* ================================================================== */}
      {/* NEW SECTION 1: STATISTICS (Pure Text & CSS) */}
      {/* ================================================================== */}
      <section className="bg-brand py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-black/10">
            <Fade cascade triggerOnce>
              {[
                { count: "10K+", label: "Artworks" },
                { count: "2.5K+", label: "Artists" },
                { count: "500+", label: "Auctions" },
                { count: "12", label: "Countries" }
              ].map((stat, idx) => (
                <div key={idx} className="p-4">
                  <h3 className="text-4xl md:text-5xl font-extrabold text-black mb-2">{stat.count}</h3>
                  <p className="text-black/80 font-semibold text-lg uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </Fade>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* NEW SECTION 2: BROWSE BY CATEGORIES (Real Unsplash Images) */}
      {/* ================================================================== */}
      <section className="container mx-auto px-4 py-20 bg-white dark:bg-black">
        <Fade triggerOnce>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Browse Categories</h2>
            <p className="text-gray-600 dark:text-gray-400">Find art that speaks to your soul</p>
          </div>
        </Fade>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: 'Oil Painting', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=300' },
            { name: 'Digital Art', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300' },
            { name: 'Sculpture', img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=300' },
            { name: 'Photography', img: 'https://cdn.pixabay.com/photo/2023/08/15/09/21/camera-8191564_640.jpg' },
            { name: 'Abstract', img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=300' },
            { name: 'Watercolor', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=300' }
          ].map((cat, idx) => (
            <Fade key={idx} triggerOnce delay={idx * 50}>
              <div className="group cursor-pointer text-center">
                <div className="w-full aspect-square rounded-full overflow-hidden mb-4 border-4 border-gray-100 dark:border-gray-800 transition-colors group-hover:border-brand shadow-lg">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors">{cat.name}</h4>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* NEW SECTION 3: HOW IT WORKS (CSS Cards) */}
      {/* ================================================================== */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <Fade triggerOnce>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How Artify Works</h2>
              <p className="text-gray-600 dark:text-gray-400">Simple steps to start your journey</p>
            </div>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-0"></div>
            
            {[
              { step: "01", title: "Create Account", desc: "Sign up and set up your artist or collector profile." },
              { step: "02", title: "Upload Art", desc: "Showcase your best pieces with high-quality images." },
              { step: "03", title: "Connect", desc: "Interact with a global community of art lovers." },
              { step: "04", title: "Sell & Buy", desc: "Safe transactions and shipping for your masterpieces." }
            ].map((item, idx) => (
              <Fade key={idx} triggerOnce delay={idx * 100}>
                <div className="relative z-10 text-center bg-white dark:bg-black p-8 rounded-xl shadow-lg h-full border-t-4 border-brand">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-black text-white dark:bg-white dark:text-black font-bold rounded-full text-lg mb-6 shadow-md border-4 border-white dark:border-black">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* NEW SECTION 4: OUR SERVICES (Real Image + CSS Icons) */}
      {/* ================================================================== */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Fade triggerOnce direction="left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Premium Services for <span className="text-brand">Collectors</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                We go beyond just displaying art. We provide a full ecosystem for the art world.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Art Valuation", desc: "Get expert price estimates for your collection.", icon: "💎" },
                  { title: "Curated Exhibitions", desc: "Professional curation for digital and physical shows.", icon: "🏛️" },
                  { title: "Restoration Advice", desc: "Connect with certified professionals to restore art.", icon: "🖌️" }
                ].map((service, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 text-2xl shadow-sm">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
          <Fade triggerOnce direction="right">
            <div className="rounded-2xl h-96 w-full relative overflow-hidden shadow-2xl">
               <img 
                 src="http://xhlux.com/wp-content/uploads/2025/07/High-CRI-Museum-Downlight-Highlighting-Artwork-1024x559.webp" 
                 alt="Art Services" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white">
                 <p className="font-bold text-xl">Museum Grade Quality</p>
                 <p className="text-sm opacity-90">Trusted by over 500 galleries</p>
               </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ================================================================== */}
      {/* NEW SECTION 5: UPCOMING EXHIBITIONS (Real Images) */}
      {/* ================================================================== */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <Fade triggerOnce>
               <div>
                 <h2 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Exhibitions</h2>
                 <p className="text-gray-400">Mark your calendars for these exclusive events</p>
               </div>
             </Fade>
             <Link to="/events" className="text-brand hover:underline mt-4 md:mt-0 font-semibold">View All Events &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Fade triggerOnce>
               <div className="group relative h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer">
                 <img 
                    src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800" 
                    alt="Exhibition 1" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                 <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="bg-brand text-black px-3 py-1 rounded w-fit font-bold text-xs mb-3">JAN 25</span>
                    <h3 className="text-2xl font-bold mb-1">Modern Abstract Flows</h3>
                    <p className="text-gray-200">New York City & Online</p>
                 </div>
               </div>
             </Fade>
             <Fade triggerOnce delay={100}>
               <div className="group relative h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer">
                 <img 
                    src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=800" 
                    alt="Exhibition 2" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                 <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="bg-white text-black px-3 py-1 rounded w-fit font-bold text-xs mb-3">FEB 10</span>
                    <h3 className="text-2xl font-bold mb-1">Digital Renaissance</h3>
                    <p className="text-gray-200">London, UK</p>
                 </div>
               </div>
             </Fade>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* NEW SECTION 6: TESTIMONIALS (Real Avatar Images) */}
      {/* ================================================================== */}
      <section className="container mx-auto px-4 py-20 bg-white dark:bg-black">
        <Fade triggerOnce>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">What People Say</h2>
          </div>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah J.", role: "Art Collector", quote: "Artify transformed how I discover new talent. The curation is simply outstanding.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
            { name: "Mike R.", role: "Digital Artist", quote: "Finally a platform that respects artists and gives us the visibility we deserve.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
            { name: "Elena D.", role: "Gallery Owner", quote: "A seamless experience for buying and connecting with creators globally.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" }
          ].map((testi, idx) => (
            <Fade key={idx} triggerOnce delay={idx * 100}>
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl relative border border-gray-100 dark:border-gray-800">
                <span className="text-6xl text-brand/20 absolute top-4 right-6 font-serif">"</span>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic relative z-10 text-lg leading-relaxed">{testi.quote}</p>
                <div className="flex items-center gap-4">
                  <img src={testi.img} alt={testi.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white">{testi.name}</h5>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">{testi.role}</span>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

{/* ================================================================== */}
      {/* NEW SECTION 7: LATEST BLOGS (Real Thumbnails & Text) */}
      {/* ================================================================== */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <Fade triggerOnce>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Art Journal</h2>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Understanding NFT Art", 
                date: "Oct 12, 2025", 
                img: "https://s3-ap-southeast-1.amazonaws.com/prod-coins-landing/coins-landing-academy-ph-en/2022/12/Use-Cases-of-NFT---banner.png",
                desc: "Dive into the digital revolution. Learn how Non-Fungible Tokens are reshaping ownership and monetization for creators worldwide."
              },
              { 
                title: "The History of Oil Paint", 
                date: "Oct 08, 2025", 
                img: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=500",
                desc: "From the Renaissance to modern studios, explore the rich evolution of oil painting and why it remains the gold standard for fine art."
              },
              { 
                title: "5 Tips for New Collectors", 
                date: "Sep 25, 2025", 
                img: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&q=80&w=500",
                desc: "Starting an art collection can be daunting. Here are five essential tips to spot value, understand provenance, and define your personal aesthetic."
              }
            ].map((blog, idx) => (
              <Fade key={idx} triggerOnce delay={idx * 100}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={blog.img} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-brand font-bold uppercase tracking-wider">{blog.date}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-3 hover:text-brand cursor-pointer">{blog.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {blog.desc}
                    </p>
                    <button className="text-sm font-semibold text-gray-900 dark:text-white border-b-2 border-brand pb-1 hover:text-brand transition-colors">Read More</button>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* NEW SECTION 8: FAQ (Text Only) */}
      {/* ================================================================== */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <Fade triggerOnce>
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          </div>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { q: "How do I sell my art?", a: "Simply create an account, go to your dashboard, and click 'Add Artwork'. Fill in the details and publish." },
             { q: "Is shipping insured?", a: "Yes, all premium shipments are fully insured against damage during transit." },
             { q: "What payment methods are accepted?", a: "We accept all major credit cards, PayPal, and select cryptocurrencies." },
             { q: "Can I return an artwork?", a: "We have a 7-day return policy if the artwork does not match the description provided." }
           ].map((faq, idx) => (
             <Fade key={idx} triggerOnce delay={idx * 50}>
               <div className="bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 p-6 rounded-lg hover:border-brand/50 transition-colors">
                 <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                   <span className="text-brand text-xl">?</span> {faq.q}
                 </h4>
                 <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-6">{faq.a}</p>
               </div>
             </Fade>
           ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* NEW SECTION 9: NEWSLETTER (CSS Gradient/Patterns) */}
      {/* ================================================================== */}
      <section className="container mx-auto px-4 py-16">
        <Fade triggerOnce>
          <div className="bg-gradient-to-br from-brand/20 via-white to-brand/10 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl p-8 md:p-16 text-center border border-brand/20 dark:border-gray-700">
             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Stay Inspired</h2>
             <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
               Subscribe to our newsletter to get the latest art news, weekly highlights, and exclusive offers delivered to your inbox.
             </p>
             <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
               <input 
                 type="email" 
                 placeholder="Your email address" 
                 className="flex-1 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-black dark:text-white focus:outline-hidden focus:ring-2 focus:ring-brand"
               />
               <button className="bg-brand hover:bg-brand-dark text-black font-bold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-brand/50">
                 Subscribe
               </button>
             </form>
          </div>
        </Fade>
      </section>

      {/* ================================================================== */}
      {/* NEW SECTION 10: CALL TO ACTION (Real Background Image) */}
      {/* ================================================================== */}
      <section className="relative py-24 bg-black overflow-hidden">
         {/* Real High-Res Background Image */}
         <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1569091791842-7cf9646552dd?auto=format&fit=crop&q=80&w=1600')` }}
         ></div>
         
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80"></div>
         
         <div className="container mx-auto px-4 relative z-10 text-center">
            <Fade triggerOnce>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Ready to Showcase Your Talent?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
                Join the fastest-growing community of artists and collectors today. It's free to get started.
              </p>
              <Link
                to="/add-artwork"
                className="inline-block px-10 py-4 bg-brand text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(255,193,7,0.4)] hover:shadow-[0_0_30px_rgba(255,193,7,0.8)] hover:scale-105 transition-all duration-300"
              >
                Join Artify Now
              </Link>
            </Fade>
         </div>
      </section>

    </div>
  );
};

export default Home;