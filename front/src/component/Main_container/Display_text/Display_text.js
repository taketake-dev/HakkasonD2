import React from 'react';
import './Display_text.css';

function Display_text({ size_of_text, draw_text }) 
{
  // 動的にクラス名を設定
  const text_size = `text_of_page-${size_of_text}`;

  return (
    <div className={text_size}>
      {draw_text}
    </div>
  );
}

export default Display_text;