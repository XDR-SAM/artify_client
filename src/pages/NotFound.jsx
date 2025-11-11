import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-4 py-16 transition-colors duration-300 dark:bg-surface-dark">
      <Fade triggerOnce>
        <div className="space-y-6 text-center">
          <h1 className="text-7xl font-display font-bold text-brand md:text-9xl">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white md:text-4xl">
            Page Not Found
          </h2>
          <p className="mx-auto max-w-xl text-base text-gray-600 dark:text-gray-400 md:text-lg">
            The page you're looking for doesn't exist😒.
          </p>
          <Link
            to="/"
            className="primary-btn inline-flex"
          >
            Go Home vai
          </Link>
        </div>
      </Fade>
    </div>
  );
};

export default NotFound;

