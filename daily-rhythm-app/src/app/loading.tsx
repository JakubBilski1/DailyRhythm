import React from 'react';

type LoadingSpinnerProps = {
    width?: string;
    height?: string;
};

const LoadingSpinner = ({ width, height }: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className={`animate-spin rounded-full border-t-4 border-b-4 border-white border-t-transparent w-${width} h-${height}`}></div>
    </div>
  );
};

export default LoadingSpinner;
