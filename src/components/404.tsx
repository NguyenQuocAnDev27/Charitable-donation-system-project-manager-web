import React from 'react';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-4">Page Not Found</p>
      <a href="/" className="text-blue-500 hover:text-blue-700 underline">
        Go back to Home
      </a>
    </div>
  );
};

export default Custom404;
