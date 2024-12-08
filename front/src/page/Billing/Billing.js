import React, { useState } from 'react';
import IMAGE1 from './images/MATSUOKA.jpg'; // 画像のパス

const Billing = () => {
  const [ricePoints, setRicePoints] = useState(''); // お米ポイントの入力値を管理する

  const handleRicePointsChange = (e) => 
  {
    const value = e.target.value;
    // マイナス値を防ぐ
    if (value === '' || (Number(value) >= 0 && /^[0-9]*$/.test(value)))setRicePoints(value);
  };

  const handlePurchase = () => 
  {
    if (ricePoints) 
    {
      console.log(`お米ポイントを ${ricePoints} 購入します！`);
      alert(`お米ポイントを ${ricePoints} 購入しました！`);
    } 
    else 
    {
      alert('お米ポイントの量を入力してください！');
    }
  };

  return (
    <div>
      <h1>課金画面</h1>

      {/* 欲しいお米ポイントの入力フォーム */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3>欲しいお米ポイントの量を入力してね！</h3>
        <h1>※1お米ポイント=1円</h1>
        <input
          type="number"
          value={ricePoints}
          onChange={handleRicePointsChange}
          placeholder="例: 1000"
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '200px',
            marginBottom: '10px',
          }}
          min="0" // マイナス値を入力できなくする
        />
        <br />
        <button
          onClick={handlePurchase}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          課金する！
        </button>
        <br />
        {/* 画像を表示 */}
        <img
          src={IMAGE1}
          alt="お米ポイントの説明"
          style={{
            marginTop: '20px',
            width: '300px',
            height: 'auto',
          }}
        />
      </div>
      <h2>課金してくれるよな！( ´∀｀ )</h2>
      <h1>　　　</h1>
      <h1>　　　</h1>
    </div>
  );
};

export default Billing;
