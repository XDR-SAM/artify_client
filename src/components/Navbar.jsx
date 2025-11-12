import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ToggleSwitch from './ToggleSwitch';
import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowDropdown(false);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen || showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, showDropdown]);

  const navItems = [
    { to: '/', label: 'Home', private: false, exact: true },
    { to: '/explore', label: 'Explore Artworks', private: false },
    { to: '/add-artwork', label: 'Add Artwork', private: true },
    { to: '/my-gallery', label: 'My Gallery', private: true },
    { to: '/my-favorites', label: 'My Favorites', private: true },
  ];

  const handleNavClick = (item) => (event) => {
    if (!user && item.private) {
      event.preventDefault();
      navigate('/login', {
        state: { from: { pathname: item.to } },
        replace: false,
      });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = navItems.map((item) => {
    const isActive = item.exact
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);

    return (
      <Link
        key={item.to}
        to={item.to}
        onClick={handleNavClick(item)}
        className={`ghost-btn w-full justify-start px-4 py-2 lg:w-auto lg:justify-center ${
          isActive ? 'bg-brand/10 text-brand dark:bg-brand/15 dark:text-brand' : ''
        } ${!user && item.private ? 'opacity-80' : ''}`}
      >
        {item.label}
      </Link>
    );
  });

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl transition-colors duration-300 dark:border-gray-800/60 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-display font-semibold tracking-tight text-gray-900 transition-opacity duration-200 hover:opacity-80 dark:text-white md:text-3xl"
        >
          <img src={logo} alt="Artify logo" className="h-9 w-auto md:h-10" />
          <span>
            Art<span className="text-brand">ify</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 text-sm font-semibold text-gray-600 dark:text-gray-300 lg:flex">
          {navLinks}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-4">
          <ToggleSwitch />

          {/* Desktop Auth */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="ghost-btn border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  Logout
                </button>
                
                {/* Profile Dropdown */}
                <div
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => {
                    if (!dropdownOpen) {
                      setShowDropdown(false);
                    }
                  }}
                >
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/60 p-1 transition-all duration-200 hover:border-brand/40 hover:shadow-md dark:border-gray-700/60 dark:bg-gray-900/60"
                  >
                    <img
                      src={
                        user.photoURL ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=f3b519&color=000`
                      }
                      alt={user.displayName || 'User'}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </button>

                  {(showDropdown || dropdownOpen) && (
                    <div
                      className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-gray-200/70 bg-white/90 p-3 shadow-xl backdrop-blur-lg dark:border-gray-800/70 dark:bg-slate-900/90 z-50"
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => {
                        setShowDropdown(false);
                        setDropdownOpen(false);
                      }}
                    >
                      <div className="rounded-xl bg-surface-muted/60 p-4 dark:bg-slate-950/50">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {user.displayName || 'Artify Artist'}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="mt-3 w-full rounded-xl border border-red-100/60 bg-red-50/90 px-4 py-2 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-100 dark:border-red-500/20 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="ghost-btn">
                  Login
                </Link>
                <Link to="/register" className="primary-btn">
                  Join Artify
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-gray-200/70 bg-white/80 p-2 text-gray-700 transition-colors duration-200 hover:border-brand/40 hover:text-brand dark:border-gray-700/60 dark:bg-slate-900/70 dark:text-gray-300 dark:hover:text-brand lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-gray-200/60 bg-white/90 px-4 pb-6 pt-4 shadow-lg backdrop-blur-xl dark:border-gray-800/60 dark:bg-slate-950/90 lg:hidden">
          <div className="flex flex-col gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
            {navLinks}
          </div>

          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-200/60 bg-surface-muted/70 p-4 dark:border-gray-800/60 dark:bg-slate-950/60">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=f3b519&color=000`
                    }
                    alt={user.displayName || 'User'}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.displayName || 'Artist'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="primary-btn w-full bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="secondary-btn w-full">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="primary-btn w-full">
                  Join Artify
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;