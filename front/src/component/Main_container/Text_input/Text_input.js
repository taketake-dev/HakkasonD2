import React, { useState } from 'react';

const TextInput = ({ onTextChange, value = '', width, height, maxLength = 300 }) => 
{
  const [inputValue, setInputValue] = useState(value);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // 画面サイズに基づいてデフォルト値を設定
  const defaultWidth = width || '90vw'; // デバイス幅の90%
  const defaultHeight = height || '20vh'; // デバイス高さの20%

  const handleChange = (e) => 
  {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) 
    {
      setInputValue(newValue);
      onTextChange(newValue); // 入力値を親に通知
      setIsLimitReached(false); // 制限に達していないのでリセット
    }
    else 
    {
      setIsLimitReached(true); // 制限に達した場合にフラグを立てる
    }
  };

  return (
    <div>
      <textarea
        value={inputValue}
        onChange={handleChange} // 条件なしで handleChange を設定
        placeholder="ここにテキストを入力"
        style={{ width: defaultWidth, height: defaultHeight }}
      />
      <p>{`${inputValue.length}/${maxLength}`} 文字</p>
      {isLimitReached && (
        <p style={{ color: 'red', fontSize: '12px' }}>これ以上入力できません。</p>
      )}
    </div>
  );
};

export default TextInput;
