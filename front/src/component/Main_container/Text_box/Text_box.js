// Text_box.js
import React from 'react';

const Text_box = ({ textList }) => 
{
  return (
    <div className="text-box">
      {textList.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
};

export default Text_box;
