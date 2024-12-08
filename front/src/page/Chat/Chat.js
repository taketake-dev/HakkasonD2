import React from 'react';
import Button_chat from './Chat_button'
const Chat = ({ setCurrentPage }) => 
{
  

  return (
    <div>
      <Button_chat/>
      <h1>Chat画面</h1>

      <button onClick={() => setCurrentPage("communication")}>
        プロフィール画面へ戻る
      </button>
    </div>
  );
};

export default Chat;
