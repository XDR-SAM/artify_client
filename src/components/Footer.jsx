import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200/60 bg-white/80 text-gray-700 backdrop-blur-xl dark:border-gray-800/70 dark:bg-slate-950/70 dark:text-gray-300 transition-colors duration-300">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        {/* Footer grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand section */}
          <div className="flex flex-col items-start space-y-4">
            <Link
              to="/"
              className="text-3xl font-display font-bold text-brand tracking-tight hover:opacity-90 transition">
              Artify
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Showcase your creative works, discover inspiring pieces, and stay
              connected with the global Artify community.
            </p>
            <div className="rounded-full bg-brand/10 px-4 py-2 text-xs font-semibold text-brand">
              Crafted for artists & collectors
            </div>
          </div>

          {/* Navigation Section */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Explore Artworks", path: "/explore" },
                { name: "Submit Artwork", path: "/add-artwork" },
                { name: "My Gallery", path: "/my-gallery" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="transition-colors duration-200 hover:text-brand"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & social part */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Stay in touch
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              contact@artify.com <br /> 01319685469
            </p>

            <div className="flex items-center gap-4">
              {[
                {
                  name: "Twitter",
                  link: "https://twitter.com",
                  icon: (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  ),
                },
                {
                  name: "Facebook",
                  link: "https://facebook.com",
                  icon: (
                    <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                  ),
                },
                {
                  name: "Instagram",
                  link: "https://instagram.com",
                  icon: (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.675a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324z" />
                  ),
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300/70 text-gray-500 transition-all duration-200 hover:border-brand hover:text-brand dark:border-gray-700/70"
                >
                  <span className="sr-only">{item.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {item.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-200/60 dark:border-gray-800/60 pt-6 flex flex-col items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Artify. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://example.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-brand"
            >
              Privacy
            </a>
            <a
              href="https://example.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-brand"
            >
              Terms
            </a>
            <a
              href="mailto:contact@artify.com"
              className="transition-colors duration-200 hover:text-brand"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
