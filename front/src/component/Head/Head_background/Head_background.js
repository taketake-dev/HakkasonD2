import React from 'react';
import './Head_background.css'; // CSSファイルをインポート

function HeadBackground({ Now_page }) 
{
  // 画像のURLを動的に決定する
  const backgroundClass = `header-background-${Now_page}`; // 例: Now_pageが"profile"ならheader-background-profileに

  return (
    <div className={`header-background ${backgroundClass}`}>
      {/* ヘッダー内容は親コンポーネントで表示 */}
    </div>
  );
}

export default HeadBackground;
