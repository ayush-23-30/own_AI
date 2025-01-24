import React from 'react';

function Button({ loading, className, children, ...props }) {
  return (
    <button
      className={`flex items-center justify-center px-4 py-2 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      } ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && (
        <svg
          className="w-5 h-5 mr-2 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4zm2 5.292A7.963 7.963 0 0112 20v-8H6z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}

export default Button;
