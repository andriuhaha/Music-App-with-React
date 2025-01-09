import React, { useEffect } from 'react';
import gsap from 'gsap';

const Welcome = () => {
  useEffect(() => {
    gsap.to('#welcome', { opacity: 1, delay: 1, duration: 2 });
  }, []);

  return (
    <div
      id="welcome"
      className="mt-40 p-6 opacity-0 flex flex-col items-center" // Start with 0 opacity for the animation
    >
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome
      </h1>
      <p className="mt-2 text-lg font-semibold text-gray-800">Create your own playlist. Listen.</p>
    </div>
  );
};

export default Welcome;
