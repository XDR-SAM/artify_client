const SkeletonCard = () => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 h-full flex flex-col animate-pulse">

            {/* Image Skeleton - Fixed aspect ratio */}
            <div className="relative overflow-hidden aspect-[4/3] bg-gray-200 dark:bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-700/50 to-transparent animate-shimmer" />
            </div>

            {/* Content Skeleton */}
            <div className="p-6 flex flex-col flex-1">
                {/* Title */}
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded mb-3 w-3/4" />

                {/* Artist */}
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2 w-1/2" />

                {/* Meta Info */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-12" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-16" />
                </div>

                {/* Button */}
                <div className="mt-auto">
                    <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-full" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
