import React, { useState, useEffect } from 'react';
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';

function Preloader() {
  const [size, setSize] = useState(getCssVar('--loaderSize'));

  function getCssVar(varName) {
    const root = getComputedStyle(document.documentElement);
    const value = parseInt(root.getPropertyValue(varName));
    return !isNaN(value) ? value : 40; 
  }

  useEffect(() => {
    const updateSize = () => {
      const newSize = getCssVar('--loaderSize');
      setSize(newSize);
    };

    updateSize();

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div className="Preloader">
      <Ring
        size={size}
        stroke="5"
        bgOpacity="0"
        speed="2"
        color="var(--secondary)"
      />
    </div>
  );
}

export default Preloader;