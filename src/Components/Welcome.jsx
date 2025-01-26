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
      <div className="text-3xl font-bold text-gray-800">
        Welcome
      </div>
      <div className="mt-2 text-lg font-semibold text-gray-800">Create your own playlist. Listen.</div>
    </div>
  );
};

export default Welcome;
