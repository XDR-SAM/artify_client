import { Link } from 'react-router-dom';

const ArtworkCard = ({ artwork, showActions = false, onEdit, onDelete }) => {
    return (
        <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 h-full flex flex-col">

            {/* Image Container - Fixed aspect ratio */}
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={artwork.imageURL}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white">
                    {artwork.category}
                </div>

                {/* Visibility Badge (only show if provided) */}
                {artwork.visibility && (
                    <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${artwork.visibility === 'Public'
                            ? 'bg-green-500/90 text-white'
                            : 'bg-gray-800/90 text-white'
                            }`}>
                            {artwork.visibility === 'Public' ? '🌍 Public' : '🔒 Private'}
                        </div>
                    </div>
                )}
            </div>

            {/* Content - Flexible to fill remaining space */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {artwork.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    <span className="font-medium">Artist:</span> {artwork.artistName}
                </p>

                {/* Meta Information */}
                <div className="flex items-center gap-3 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
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

                {/* Action Buttons - Always at bottom */}
                <div className="mt-auto">
                    {showActions ? (
                        <div className="flex gap-2">
                            <Link
                                to={`/artwork/${artwork._id}`}
                                className="flex-1 text-center px-3 py-2 bg-brand text-black font-semibold rounded-lg hover:bg-brand-dark transition-all duration-300 text-sm"
                            >
                                View
                            </Link>
                            {onEdit && (
                                <button
                                    onClick={() => onEdit(artwork)}
                                    className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm"
                                    title="Edit artwork"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={() => onDelete(artwork._id)}
                                    className="px-3 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 text-sm"
                                    title="Delete artwork"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ) : (
                        <Link
                            to={`/artwork/${artwork._id}`}
                            className="block w-full rounded-lg bg-brand px-4 py-2.5 text-center font-semibold text-black transition-all duration-300 shadow-md hover:bg-brand-dark hover:shadow-lg"
                        >
                            View Details
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;
