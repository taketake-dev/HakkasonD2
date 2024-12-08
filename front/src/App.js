import React, { useState } from 'react';
import './App.css';
import Login from './page/Login/Login';
import Account from './page/Account/Account';
import Profile from './page/Profile/Profile';
import Production from './page/Production/Production';
import Communication from './page/Communication/Communication';
import SUIHANN from './page/SUIHANN/SUIHANN';
import Ranking from './page/Ranking/Ranking';
import Recruitment from './page/Recruitment/Recruitment';
import Billing from './page/Billing/Billing';
import Chat from './page/Chat/Chat';
import Header from './component/Head/Header';

function App() 
{
  // 現在のページを管理する状態変数
  const [currentPage, setCurrentPage] = useState("login");
  const [loginAddress, setLoginAddress] = useState("");  // メールアドレスを保持
  const [Recruitment_flag,set_Recruitment_flag]=useState(true);//自身の募集の可否
  const [Apply_flag,set_Apply_flag]=useState(true);//自身の募集の可否
  // ページコンポーネントをレンダリングする関数
  const renderPage = () => 
  {
    switch (currentPage) 
    {
      case "login": return <Login setCurrentPage={setCurrentPage} set_login_address={setLoginAddress} />; // LoginコンポーネントにsetCurrentPageを渡す
      case "profile": return <Profile />;
      case "account": return <Account setCurrentPage={setCurrentPage} set_login_address={setLoginAddress}/>;
      case "production": return <Production />;
      case "communication": return <Communication  setCurrentPage={setCurrentPage} login_address ={loginAddress}/>;
      case "SUIHANN": return <SUIHANN />;
      case "ranking": return <Ranking my_address={loginAddress}/>;
      case "recruitment": return <Recruitment name={loginAddress} set_Recruitment_flag={set_Recruitment_flag} Recruitment_flag={Recruitment_flag} Apply_flag={Apply_flag} set_Apply_flag={set_Apply_flag}/>;
      case "billing": return <Billing />;
      case "chat": return <Chat setCurrentPage={setCurrentPage} />;
      default: return <Login setCurrentPage={setCurrentPage} />; // デフォルトはログイン画面
    }
  };

  // ログアウト処理
  const handleLogout = () => 
  {
    setCurrentPage("login");//ログイン画面に戻す
    set_Apply_flag(true);//初期状態にリセット
    set_Recruitment_flag(true);//初期状態にリセット
    setLoginAddress("");//ログイン時のメールアドレスをリセット
  };

  return (
    <div className="App">
      {/* Headerを表示 */}
      {currentPage !== "login" && currentPage !== "account" && currentPage!=="chat" && (
        <Header
          select_1="プロフィール画面へ" onClick1={() => setCurrentPage("profile")}
          select_2="制作物画面へ" onClick2={() => setCurrentPage("production")}
          select_3="コミュニケーション画面へ" onClick3={() => setCurrentPage("communication")}
          select_4="すいはん画面へ" onClick4={() => setCurrentPage("SUIHANN")}
          select_5="ランキング画面へ" onClick5={() => setCurrentPage("ranking")}
          select_6="募集画面へ" onClick6={() => setCurrentPage("recruitment")}
          select_7="課金画面へ" onClick7={() => setCurrentPage("billing")}
          open_name="項目を閉じる" close_name="他のページを開く"
          Page={currentPage}
          logout={handleLogout} // ログアウト処理
          name={loginAddress}
        />
      )}
      {/* 現在のページを表示 */}
      {renderPage()}
    </div>
  );
}

export default App;
