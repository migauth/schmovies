import React, { useState, useEffect } from 'react';
import './styles/CheeseSlider.scss';

const CheeseSlider = ({ question, onChange }) => {
  const [cheeseLevel, setCheeseLevel] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cheeseDescriptions = [
    "highbrow",
    "decent",
    "average",
    "silly",
    "cheesy"
  ];

  useEffect(() => {
    onChange(cheeseDescriptions[cheeseLevel]);
  }, [cheeseDescriptions, cheeseLevel, onChange]);

  const handleSliderChange = (event) => {
    setCheeseLevel(event.target.value);
  };

  return (
    <div>
      <p className='test'>Cheese Slider 🧀</p>
      <input
        type="range"
        min="0"
        max="4"
        value={cheeseLevel}
        onChange={handleSliderChange}
        className="custom-slider" // Add a custom class for styling
      />
    </div>
  );
};

export default CheeseSlider;
