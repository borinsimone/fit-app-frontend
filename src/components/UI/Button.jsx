import React from 'react';

const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
