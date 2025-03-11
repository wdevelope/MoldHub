import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'px-3 py-1 rounded focus:outline-none focus:ring';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-500 text-gray-500 hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const variantStyle = variants[variant] || variants.primary;

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
