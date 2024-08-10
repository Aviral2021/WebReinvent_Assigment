import React from 'react';

const Button = ({ onClick, children }) => (
  <button onClick={onClick} className="btn bg-blue-500 text-white p-2 rounded">
    {children}
  </button>
);

export default Button;
