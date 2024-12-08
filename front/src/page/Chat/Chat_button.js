import React, { useState } from 'react';

const Chat_button = () => 
{
  const [a, aa] = useState(1);

  const chat_button = () => 
  {
    aa(3); // 状態を3に更新
  };

  return (
    <div>
      <button onClick={chat_button}>{a}</button>
    </div>
  );
};

export default Chat_button;
