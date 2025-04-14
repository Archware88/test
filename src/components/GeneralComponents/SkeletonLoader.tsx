import React from "react";

const SkeletonLoader = ({ count = 1 }) => {
    return (
        <div className=" gap-6">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="bg-white shadow-md shadow-gray rounded-lg overflow-hidden p-4 animate-pulse">
                    {/* Image Placeholder */}
                    <div className="w-full h-48 bg-gray-300 rounded-lg"></div>

                    {/* Course Details Placeholder */}
                    <div className="mt-4 space-y-2">
                        {/* Title Placeholder */}
                        <div className="h-4 w-3/4 bg-gray-400 rounded"></div>

                        {/* Authors Placeholder */}
                        <div className="h-3 w-1/2 bg-gray-300 rounded"></div>

                        {/* Rating Placeholder */}
                        <div className="flex items-center space-x-1 mt-2">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="h-4 w-4 bg-gray-300 rounded-full"></div>
                            ))}
                        </div>

                        {/* Progress Bar Placeholder */}
                        <div className="mt-3 flex items-center">
                            <div className="h-2 bg-gray-300 rounded-full w-1/2 mr-3 relative overflow-hidden">
                                <div className="h-2 bg-gray-400 rounded-full w-1/3"></div>
                            </div>
                            <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
