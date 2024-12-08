import React, { useState } from 'react';
import Side_button from '../../component/Main_container/Side_button/Side_button';
import Data_account from './Data_account';

function Account({ setCurrentPage,set_login_address }) 
{
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error_name, error_name_set] = useState("");
  const [error_mail, error_mail_set] = useState("");
  const [error_password, error_text_password] = useState("");
  const [decide_address,set_decide_address]=useState(false);
  // 入力のバリデーションを行う関数
  const validateForm = () => 
  {
    let valid = true;

    // 名前のバリデーション
    if (name.length < 6) 
    {
      error_name_set("名前は6文字以上で入力してください");
      valid = false;
    } 
    else 
    {
      error_name_set("");
    }

    // メールアドレスのバリデーション
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(mail)) 
    {
      error_mail_set("有効なメールアドレスを入力してください");
      valid = false;
    } 
    else 
    {
      error_mail_set("");
    }

    // パスワードのバリデーション
    if (password.length < 6) 
    {
      error_text_password("パスワードは6文字以上で入力してください");
      valid = false;
    } 
    else 
    {
      error_text_password("");
    }
    return valid;
  };

  // アカウント作成終了処理
  const Make_Account_end = () => 
  {
    if (validateForm()) 
    {
      // データをData_accountに渡す
      set_login_address(mail);//ログイン時のメールアドレスを保持
      set_decide_address(true);
    }
  };

  const Return_to_login_screen = () => {
    setCurrentPage('login'); // ログイン画面に戻る
  };

  return (
    <div>
      <h1>アカウント設定</h1>
      {/* 名前の入力 */}
      <div>
        <label>名前: </label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        {error_name && <div style={{color: "red"}}>{error_name}</div>}
      </div>

      {/* メールアドレスの入力 */}
      <div>
        <label>メールアドレス: </label>
        <input 
          type="email" 
          value={mail} 
          onChange={(e) => setMail(e.target.value)} 
        />
        {error_mail && <div style={{color: "red"}}>{error_mail}</div>}
      </div>

      {/* パスワードの入力 */}
      <div>
        <label>パスワード: </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {error_password && <div style={{color: "red"}}>{error_password}</div>}
      </div>

      {/* 登録ボタン */}
      <Side_button 
        Button_text="上記の内容でアカウント登録" 
        button_position="center" 
        onClick={Make_Account_end} 
      />

      {/* ログイン画面に戻るリンク */}
      <a 
        href="#" 
        onClick={Return_to_login_screen} 
        style={{
          display: 'block', 
          textAlign: 'center', 
          margin: '0 auto', 
          width: 'fit-content'
        }}
      >
        ログイン画面に戻りたい場合はここをクリック
      </a>

      {/* Data_accountを呼び出し、formDataを渡す */}
      <Data_account formData={{ name, mail, password }}decide_address={decide_address}setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Account;
