import React, { useState } from 'react';
import Side_button from './Side_button/Side_button';
import Display_text from './Display_text/Display_text';
import Text_box from './Text_box/Text_box';
import Text_input from './Text_input/Text_input';
import Select_input from './Select_input/Select_input';  // SelectInput をインポート
import Line from './Line/Line'; // Lineコンポーネントをインポート
const MainContainer = ({ layoutData }) => 
{
  return (
    <div className="main-container">
      {layoutData.map((item, index) => (
        <div key={index} className="content-block">
          <div
            className="content-item"
            style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
          >
            {/* サイドボタン */}
            {item.sideButtonPosition && (
              <Side_button
                Button_text={item.buttonText}
                Button_position={item.sideButtonPosition}
                onClick={item.onClick}
              />
            )}

            {/* 画像表示 */}
            {item.imageSrc && (
              <img src={item.imageSrc} alt="コンテンツ画像" className="content-image" />
            )}

            {/* 画像表示（新しいimage） */}
            {item.image && (
              <img src={item.image} alt="表示する画像" className="content-image" />
            )}

            {/* テキスト表示 */}
            {item.text && (
              <Display_text
                size_of_text={item.textSize}
                draw_text={item.text}
              />
            )}

            {/* テキストボックス表示 */}
            {item.textBoxData && (
              <Text_box textList={item.textBoxData} />
            )}

            {/* テキスト入力 */}
            {item.onTextChange && (
              <Text_input
                onTextChange={item.onTextChange}
                width={item.textInputWidth}  // Pass width from layoutData
                height={item.textInputHeight}  // Pass height from layoutData
              />
            )}

            {/* 選択肢（SelectInput） */}
            {item.selectOptions && (
              <Select_input
                options={item.selectOptions} // Selectの選択肢と対応する関数
                defaultText={item.select_input_text}
              />
            )}

            {/* 境界線を表示 */}
            {item.line_color && item.line_thickness && item.line_width && (
              <Line
                color={item.line_color} 
                thickness={item.line_thickness} 
                width={item.line_width}
              />
            )}
          </div>
        </div>
      ))}

    <h1>　　　　　　　　</h1>
    <h1>　　　　　　　　</h1>

    </div>
  );
};

export default MainContainer;
