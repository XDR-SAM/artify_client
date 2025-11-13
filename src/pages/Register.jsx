import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
  const hasMinLength = pwd.length >= 6;
    return hasUpperCase && hasLowerCase && hasMinLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long'
      );
      return;
    }

    setLoading(true);
    try {
    await register(name, email, photoURL, password);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Google signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <Fade triggerOnce>
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Or{' '}
              <Link
                to="/login"
                className="font-semibold text-brand transition-colors duration-200 hover:text-brand-dark"
              >
                sign in to your existing account
              </Link>
            </p>
          </div>
          <div className="surface-card backdrop-sheen" data-padding="compact">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div>
                <label htmlFor="name" className="input-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Your name"
                  value={name}
                onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="input-label">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="photoURL" className="input-label">
                  Photo URL 
                </label>
                <input
                  id="photoURL"
                  name="photoURL"
                  type="url"
                  className="input-field"
                  placeholder=""
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="input-field"
                  placeholder="Password (min 6 chars, uppercase & lowercase)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="form-helper">
                  Must contain uppercase, lowercase, and be at least 6 characters
                </p>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="input-label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="input-field"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="primary-btn w-full py-3 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="secondary-btn w-full justify-center py-3 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2">Sign up with Google</span>
                </button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Register;

