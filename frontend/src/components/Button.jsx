import React from 'react';

const Button = ({ children, variant, ...props }) => {
  const className = variant === 'outline' ? 'border border-gray-500' : 'bg-blue-500 text-white';
  return (
    <button className={`px-4 py-2 rounded ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
