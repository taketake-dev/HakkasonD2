import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
//ーーーーー
export const Registration_Data = () => //登録情報が入ったデータベースのデータすべて取得する関数
{
  return [
    { ユーザーネーム: "AA", パスワード: "", メールアドレス: "", 応募相手: "いない", 募集相手: "", 米ポイント: 100 },
    { ユーザーネーム: "BB", パスワード: "B", メールアドレス: "B", 応募相手: "いない", 募集相手: "", 米ポイント: 50 },
    { ユーザーネーム: "CC", パスワード: "C", メールアドレス: "C", 応募相手: "いない", 募集相手: "", 米ポイント: 80 },
    { ユーザーネーム: "DD", パスワード: "D", メールアドレス: "D", 応募相手: "いない", 募集相手: "", 米ポイント: 200 }
  ];
};
export const my_Registration_Data= (My_address) => //メールアドレス情報を基に登録情報保存されたデータベース内の一部テーブルを取得する関数
{
    return { ユーザーネーム: "AA", パスワード: "", メールアドレス: "", 応募相手: "いない", 募集相手: "" };
}
//ーーーーー

const Data_login = forwardRef(({ fetchUrl }, ref) => 
{
  const [email, setEmail] = useState(""); // 初期値
  const [password, setPassword] = useState(""); // 初期値
  const [registrationData, setRegistrationData] = useState([]); // 登録データ

  // refで親コンポーネントから活用可能な関数を公開
  useImperativeHandle(ref, () => ({
    checkLogin: (email, password) => checkLogin(email, password), // checkLogin関数を公開
  }));

  // 初回レンダリング時に登録データを取得
  useEffect(() => {
    const fetchData = async () => {
      const fetchedRegistrationData = Registration_Data(); // 登録データ取得
      setRegistrationData(fetchedRegistrationData); // 登録データセット
    };
    fetchData();
  }, []);

  // メールアドレスとパスワードが一致するデータを探す関数
  const checkLogin = (email, password) => {
    // 登録情報データベース内で一致するものを探す
    const user = registrationData.find(
      (item) => item.メールアドレス === email && item.パスワード === password
    );
    return user ? user : null; // 見つかった場合、そのデータを返す。見つからなければ null を返す
  };

  // UIを返す

});

export default Data_login;
