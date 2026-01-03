import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { artworksAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ArtworkCard from '../components/ArtworkCard';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';

const MyGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteArtworkId, setDeleteArtworkId] = useState(null);
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
  });

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const response = await artworksAPI.getMyArtworks();
      setArtworks(response.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      toast.error('Error loading artworks');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteArtworkId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteArtworkId) return;

    try {
      await artworksAPI.delete(deleteArtworkId);
      toast.success('Artwork deleted successfully! ✨');
      setShowDeleteModal(false);
      setDeleteArtworkId(null);
      fetchArtworks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting artwork');
      setShowDeleteModal(false);
      setDeleteArtworkId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteArtworkId(null);
  };

  const handleEdit = (artwork) => {
    setEditingArtwork(artwork._id);
    setFormData({
      imageURL: artwork.imageURL,
      title: artwork.title,
      category: artwork.category,
      medium: artwork.medium,
      description: artwork.description,
      dimensions: artwork.dimensions || '',
      price: artwork.price || '',
      visibility: artwork.visibility,
    });
    setImagePreview(artwork.imageURL);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await artworksAPI.update(editingArtwork, formData);
      toast.success('Artwork updated successfully! ✨');
      setShowModal(false);
      setEditingArtwork(null);
      setImagePreview('');
      fetchArtworks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating artwork');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'imageURL') {
      setImagePreview(value);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-12 md:py-16">

        {/* Header */}
        <Fade triggerOnce>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                My Gallery
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {artworks.length === 0
                  ? 'Your personal art collection'
                  : `${artworks.length} ${artworks.length === 1 ? 'artwork' : 'artworks'} in your gallery`}
              </p>
            </div>
            <Link
              to="/add-artwork"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#f3b519] text-black font-semibold rounded-xl hover:bg-[#d9a515] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add New Artwork</span>
            </Link>
          </div>
        </Fade>

        {/* Empty state */}
        {artworks.length === 0 ? (
          <Fade triggerOnce>
            <div className="max-w-md mx-auto text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full mb-6">
                <svg
                  className="w-10 h-10 text-gray-400 dark:text-gray-600"
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
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Your Gallery is Empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 px-6">
                Start building your collection by adding your first artwork
              </p>
              <Link
                to="/add-artwork"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f3b519] text-black font-semibold rounded-xl hover:bg-[#d9a515] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Your First Artwork</span>
              </Link>
            </div>
          </Fade>
        ) : (
          /* Artworks grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {artworks.map((artwork, index) => (
              <Fade key={artwork._id} triggerOnce delay={index * 50}>
                <ArtworkCard
                  artwork={artwork}
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              </Fade>
            ))}
          </div>
        )}

        {/* Update modal done */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full flex flex-col max-h-[90vh] border border-gray-200 dark:border-gray-800">

              {/* Modal header */}
              <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Update Artwork
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingArtwork(null);
                    setImagePreview('');
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Image preview */}
              {imagePreview && (
                <div className="flex-shrink-0 relative h-48 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImagePreview('')}
                  />
                </div>
              )}

              {/* Modal Body - Scrollable  fix done*/}
              <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
                <form onSubmit={handleUpdate} id="update-form" className="space-y-5">

                  {/* Image url round fix done */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Image URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      name="imageURL"
                      required
                      value={formData.imageURL}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f3b519] focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Title & category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f3b519] focus:border-transparent text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f3b519] focus:border-transparent text-gray-900 dark:text-white"
                      >
                        <option value="Painting">Painting</option>
                        <option value="Digital Art">Digital Art</option>
                        <option value="Sculpture">Sculpture</option>
                        <option value="Photography">Photography</option>
                        <option value="Drawing">Drawing</option>
                        <option value="Mixed Media">Mixed Media</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Medium & visibility */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Medium/Tools <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="medium"
                        required
                        value={formData.medium}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f3b519] focus:border-transparent text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Visibility <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="visibility"
                        required
                        value={formData.visibility}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f3b519] focus:border-transparent text-gray-900 dark:text-white"
                      >
                        <option value="Public">🌍 Public</option>
                        <option value="Private">🔒 Private</option>
                      </select>
                    </div>
                  </div>

                  {/* Dimensions price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Dimensions <span className="text-gray-500 text-xs">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f3b519] focus:border-transparent text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Price <span className="text-gray-500 text-xs">(optional)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                          $
                        </span>
                        <input
                          type="number"
                          name="price"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f3b519] focus:border-transparent text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f3b519] focus:border-transparent text-gray-900 dark:text-white resize-none"
                    />
                  </div>
                </form>
              </div>

              {/* Action Buttons fix */}
              <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 px-6 py-4 bg-white dark:bg-gray-900">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    form="update-form"
                    className="flex-1 px-6 py-3 bg-[#f3b519] text-black font-semibold rounded-xl hover:bg-[#d9a515] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Update Artwork
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingArtwork(null);
                      setImagePreview('');
                    }}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete confirmation modal bg blur haha*/}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-800">
              <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
                  Delete Artwork?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                  Are you sure you want to delete this artwork? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteCancel}
                    className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default MyGallery;