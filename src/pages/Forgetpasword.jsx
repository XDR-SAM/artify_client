import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Fade } from 'react-awesome-reveal';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await resetPassword(email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <Fade triggerOnce>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white">
              Reset Password
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          <div className="surface-card backdrop-sheen" data-padding="compact">
          <form className="space-y-6" onSubmit={handleSubmit}>
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

            {message && (
              <div
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  message.includes('Error')
                    ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                    : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                }`}
              >
                {message}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="primary-btn w-full py-3 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="font-semibold text-brand transition-colors duration-200 hover:text-brand-dark"
              >
                Back to Login
              </Link>
            </div>
          </form>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default ForgetPassword;

