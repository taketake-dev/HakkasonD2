import React from 'react';
import './Side_button.css';

const Side_button = ({ Button_text, button_position, onClick }) => {
  return (
    <div className={`side-container ${button_position}`}>
      <button className="side-button" onClick={onClick}>
        {Button_text}
      </button>
    </div>
  );
};

export default Side_button;
