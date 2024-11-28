'use client'

import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa'; 

const Loading = ({ delay = 1000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer); 
  }, [delay]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-customBlue" size={40} />
      </div>
    );
  }

  return null;
};

export default Loading;
