import React, { useState, useEffect } from "react";
import MainContainer from "../../component/Main_container/Main_container"; // MainContainerをインポート
import Data_communication from "./Data_communication"; // データ取得関数
import IMAGE1 from "./images/仮画像1.png"; // 仮画像のパス

const Communication = ({ setCurrentPage, login_address }) => {
  const [userMessages, setUserMessages] = useState([]); // ユーザー名のリスト

  // データ取得 (Data_communicationからデータを取得)
  useEffect(() => 
  {
    const fetchData = async () => 
    {
      const matchedUsernames = Data_communication(login_address); // メールアドレスを渡して検索
      setUserMessages(matchedUsernames); // ユーザーネームを保存
    };

    fetchData();
  }, [login_address]); // login_addressが変更されたら再実行

  // メインコンテナに渡すデータを生成
  const layoutData = userMessages.map((username, index) => ({
    sideButtonPosition: "left",
    buttonText: `${username}さんとチャットをつなぐ`,
    onClick: () => setCurrentPage("chat"), // チャット画面へ遷移
    text: "貴方の募集に反応した人がいます！",
    textSize: 20,
    imageSrc: IMAGE1,
  }));

  return (
    <div>
      <h1>コミュニケーション画面</h1>

      {/* MainContainerコンポーネントを使って、layoutDataを渡す */}
      <MainContainer layoutData={layoutData} />
    </div>
  );
};

export default Communication;
