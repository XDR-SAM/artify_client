import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { artworksAPI } from '../utils/api';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';

const AddArtwork = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    imageURL: '',
    title: '',
    category: '',
    medium: '',
    description: '',
    dimensions: '',
    price: '',
    visibility: 'Public',
    artistName: user?.displayName || '',
    artistPhoto: user?.photoURL || '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        artistName: user.displayName || '',
        artistPhoto: user.photoURL || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update image preview
    if (name === 'imageURL') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await artworksAPI.create(formData);
      toast.success('Artwork added successfully! 🎨');
      navigate('/my-gallery');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding artwork');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        
        {/* Header */}
        <Fade triggerOnce>
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white md:text-5xl">
              Add New Artwork
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 md:text-lg">
              Share your creative masterpiece with the world
            </p>
          </div>
        </Fade>

        <Fade triggerOnce delay={100}>
          <div className="surface-card overflow-hidden">
            
            {/* Image Previewsection */}
            {imagePreview && (
              <div className="relative h-64 md:h-80 bg-gray-100 dark:bg-gray-800">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview('')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Preview</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              
              {/* Image url round fix done */}
              <div>
                <label className="input-label flex items-center gap-1">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="url"
                    name="imageURL"
                    required
                    value={formData.imageURL}
                    onChange={handleChange}
                    className="input-field pl-12 pr-4"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Title & category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="input-label flex items-center gap-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="My Masterpiece"
                  />
                </div>

                <div>
                  <label className="input-label flex items-center gap-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="input-field appearance-none pr-10"
                    >
                      <option value="">Select category</option>
                      <option value="Painting">Painting</option>
                      <option value="Digital Art">Digital Art</option>
                      <option value="Sculpture">Sculpture</option>
                      <option value="Photography">Photography</option>
                      <option value="Drawing">Drawing</option>
                      <option value="Mixed Media">Mixed Media</option>
                      <option value="Other">Other</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Medium & dimensions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="input-label flex items-center gap-1">
                    Medium/Tools <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="medium"
                    required
                    value={formData.medium}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Oil on canvas, Photoshop, etc."
                  />
                </div>

                <div>
                  <label className="input-label flex items-center gap-1">
                    Dimensions <span className="text-xs font-normal text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="24 x 36 inches"
                  />
                </div>
              </div>

              {/* Price & visibility */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="input-label flex items-center gap-1">
                    Price <span className="text-xs font-normal text-gray-500">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className="input-field pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label flex items-center gap-1">
                    Visibility <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="visibility"
                      required
                      value={formData.visibility}
                      onChange={handleChange}
                      className="input-field appearance-none pr-10"
                    >
                      <option value="Public">🌍 Public</option>
                      <option value="Private">🔒 Private</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Artist Info (Read-only) */}
              <div className="grid grid-cols-1 gap-6 rounded-2xl border border-dashed border-gray-300 bg-surface-muted/80 p-4 dark:border-gray-700 dark:bg-slate-900/40 md:grid-cols-2">
                <div>
                  <label className="input-label flex items-center gap-1">
                    Artist Name <span className="text-xs font-normal text-gray-500">(auto-filled)</span>
                  </label>
                  <input
                    type="text"
                    name="artistName"
                    value={formData.artistName}
                    readOnly
                    className="input-field cursor-not-allowed bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  />
                </div>

                <div>
                  <label className="input-label flex items-center gap-1">
                    Artist Email <span className="text-xs font-normal text-gray-500">(auto-filled)</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="input-field cursor-not-allowed bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="input-label flex items-center gap-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="input-field resize-none"
                  placeholder="Tell us about your artwork, inspiration, technique, or story behind it..."
                />
              </div>

              {/* Action buttons fix done*/}
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="primary-btn flex-1 justify-center gap-2 py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add Artwork</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/my-gallery')}
                  disabled={loading}
                  className="secondary-btn flex-1 justify-center gap-2 py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </Fade>

        {/* Help text */}
        <Fade triggerOnce delay={200}>
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Fields marked with <span className="text-red-500">*</span> are required</p>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default AddArtwork;