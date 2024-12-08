import React from 'react';

const Line = ({ color = '#000', thickness = '2px', width = '100%' }) => 
{
  return (
    <div 
      style={{
        borderTop: `${thickness} solid ${color}`,
        width: width,
        margin: '20px 0', // 上下の余白
      }}
    />
  );
};

export default Line;