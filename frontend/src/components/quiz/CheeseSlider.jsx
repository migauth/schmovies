// CheeseSlider.js
import React, { useState } from 'react';
import './CheeseSlider.scss';

const CheeseSlider = () => {
  const [cheeseLevel, setCheeseLevel] = useState(0);

  const handleSliderChange = (event) => {
    setCheeseLevel(event.target.value);
  };

  return (
    <div>
      <p className='test'>Cheese Slider 🧀</p>
      <input
        type="range"
        min="0"
        max="10"
        value={cheeseLevel}
        onChange={handleSliderChange}
        className="custom-slider" // Add a custom class for styling
      />
      <p>Cheese Level: {cheeseLevel}</p>
    </div>
  );
};

export default CheeseSlider;
