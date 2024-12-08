import React from 'react';
import './Head_button.css'; // 上記のCSSをインポート

const Head_button = ({ Button_text, Button_position, onClick }) => {
  return (
    <div className={`head-container ${Button_position}`}>
      <button className="head-button" onClick={onClick}>
        {Button_text}
      </button>
    </div>
  );
};

export default Head_button;