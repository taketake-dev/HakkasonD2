import React from 'react';
import MainContainer from '../../component/Main_container/Main_container'; // MainContainerをインポート
import IMAGE1 from './images/お米食べろ1.jpg'; // 画像のパス

// ーーーー登録情報データベースから読み込むーーーー
export const Registration_Data = () => {
  return [
    { ユーザーネーム: "AA", パスワード: "", メールアドレス: "", 応募相手: "いない", 募集相手: "", 米ポイント: 100 },
    { ユーザーネーム: "BB", パスワード: "B", メールアドレス: "B", 応募相手: "いない", 募集相手: "", 米ポイント: 50 },
    { ユーザーネーム: "CC", パスワード: "C", メールアドレス: "C", 応募相手: "いない", 募集相手: "", 米ポイント: 80 },
    { ユーザーネーム: "DD", パスワード: "D", メールアドレス: "D", 応募相手: "いない", 募集相手: "", 米ポイント: 200 }
  ];
};

// ーーーーランキングコンポーネントーーーー
const Ranking = ({ my_address }) => {
  // 登録情報データを取得
  const usersData = Registration_Data();

  // 米ポイントを基準に降順にソート
  const sortedUsers = usersData.sort((a, b) => b.米ポイント - a.米ポイント);

  // 自分の順位を計算
  const myRanking = sortedUsers.findIndex(user => user.メールアドレス === my_address) + 1;

  // メインコンテナに渡すデータを定義
  const layoutData = sortedUsers.map((user, index) => ({
    text: `ランキング${index + 1}位の${user.ユーザーネーム}さん!  米ポイント: ${user.米ポイント}です!!`,
    onClick: () => console.log(`${user.ユーザーネーム}の詳細を見る`),
    textSize: 7,
    imageSrc: IMAGE1
  }));

  return (
    <div>
      <h1>ランキング画面</h1>
      <div style={{
        textAlign: 'center',
        margin: '20px 0',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px'
      }}>
        {myRanking ? (
          <p style={{
            fontWeight: 'bold',
            fontSize: '36px',
            color: '#333',
            margin: 0
          }}>
            あなたの順位は
            <span style={{
              display: 'block', // ブロックレベル要素として扱う
              color: 'red',
              fontSize: '55px',
              fontWeight: 'bold',
              marginTop: '10px' // 上下の余白を調整
            }}>
              {myRanking}位
            </span>
          </p>
        ) : (
          <p style={{
            fontWeight: 'bold',
            fontSize: '36px',
            color: 'red',
            margin: 0
          }}>
            あなたのデータが見つかりませんでした。
          </p>
        )}
      </div>
      <h2>米ポイントランキング</h2>

      {/* MainContainerコンポーネントを使って、layoutDataを渡す */}
      <MainContainer layoutData={layoutData} />
    </div>
  );
};

export default Ranking;
