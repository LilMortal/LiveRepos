import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150"></div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-medium text-gray-300 mb-2">Loading GitHub Data</h3>
        <p className="text-gray-500 font-mono text-sm">Fetching repositories...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;