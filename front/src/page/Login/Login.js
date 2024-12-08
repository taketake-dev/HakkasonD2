import React, { useState, useRef } from 'react';
import Side_button from '../../component/Main_container/Side_button/Side_button';
import Data_login from './Data_login'; // Data_login コンポーネントをインポート
import './Login.css';

function Login({ setCurrentPage, set_login_address }) {
    const [inputText, setInputText] = useState({ password: "", mail_address: "" });
    const [OK_or_NO_text, OK_or_NO_draw] = useState("");
    const dataLoginRef = useRef(); // Data_login コンポーネントの ref

    // 入力変更ハンドラー
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputText((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // ログイン認証処理
    const access = (email, password) => {
        // checkLogin 関数を呼び出して、ユーザー情報が一致するか確認
        const user = dataLoginRef.current.checkLogin(email, password);
        if (user) {
            OK_or_NO_draw("");
            setCurrentPage("profile"); // ログイン成功後、profileページに遷移
            set_login_address(email);  // 親コンポーネントにユーザーネームを渡す
        } else OK_or_NO_draw("パスワード、またはメールアドレスが間違っています");
    };

    const handleClick = () => {
        setCurrentPage("account"); // アカウント作成画面へ遷移
    };

    return (
        <div className="login-container">
            <h1>開発者により具体的に我々の作って欲しいホームページを届けよう</h1>
            <h2>メールアドレスを入力してください</h2>
            <input
                type="email"
                name="mail_address"
                value={inputText.mail_address}
                onChange={handleInputChange}
                placeholder="ここにメールアドレスを入力"
            />

            <h2>パスワードを入力してください</h2>
            <input
                type="password"
                name="password"
                value={inputText.password}
                onChange={handleInputChange}
                placeholder="ここにパスワードを入力"
            />
            <p className='error'>{OK_or_NO_text}</p>

            <Side_button
                Button_text="ログイン開始！"
                button_position="center"
                onClick={() => { access(inputText.mail_address, inputText.password); }}
            />

            <a href="#" onClick={handleClick}>アカウントを持っていない方はここをクリック</a>

            <p>入力されたメールアドレス(テストプレイ用で表示): {inputText.mail_address}</p>
            <p>入力されたパスワード(テストプレイ用で表示): {inputText.password}</p>

            {/* Data_login コンポーネントを ref を使って組み込む */}
            <Data_login ref={dataLoginRef} />
        </div>
    );
}

export default Login;
