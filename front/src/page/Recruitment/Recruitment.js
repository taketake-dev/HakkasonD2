import React, { useState, useEffect } from 'react';
import MainContainer from '../../component/Main_container/Main_container';
import IMAGE1 from './images/Shuzo_Matsuoka.jpg';
import { my_Application, my_Recruitment } from './Data_Recruitment'; // 募集処理関数と応募処理関数import

//ーーーーこれ以降下はデータベースからデータ読み込みプログラムーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
export const fetchRecruitmentData = () => //募集状況を管理するデータベースの内容をすべて取得する関数
{
    return [
      { username: "○○", text: "こんにちは！あたしのサイト作ってよ！ばか！", person_looking_for: "受託者", mail_address: "aaaaa" },
      { username: "××", text: "こんばんは！サイト作ればか！", person_looking_for: "開発者", mail_address: "ddddd" },
      { username: "△△", text: "おはようございます！誰か私にオリジナルサイトを作ってくれないでしょうか？", person_looking_for: "受託者", mail_address: "bbbb" },
      { username: "□□", text: "昼過ぎに連絡します！貴方がほしいアプリを完璧に作って見せます", person_looking_for: "開発者", mail_address: "cccc" },
      { username: "XとY", text: "数学サイト作ります！、ちなみに俺と意見が会はないなら即クレームします覚悟しておいてください", person_looking_for: "開発者", mail_address: "dddd" }
    ];
};
  
export const Registration_Data = () => //登録情報が入ったデータベースのデータすべて取得する関数
{
    return [
      { ユーザーネーム: "AA", パスワード: "", メールアドレス: "", 応募相手: "いない", 募集相手: "" ,米ポイント:0},
      { ユーザーネーム: "BB", パスワード: "B", メールアドレス: "B", 応募相手: "いない", 募集相手: "",米ポイント:0},
      { ユーザーネーム: "CC", パスワード: "C", メールアドレス: "C", 応募相手: "いない", 募集相手: "" ,米ポイント:0},
      { ユーザーネーム: "DD", パスワード: "D", メールアドレス: "username123456789012345678901234567890123456789012345678901234567890@example.comaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.com", 応募相手: "いない", 募集相手: "" ,米ポイント:0}
    ];
};
//ーーーーこれ以降上はデータベースからデータ読み込みプログラムーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
const isMatchedRecordExists = (myEmail) => 
{
  const registrations = Registration_Data(); // 全登録データを取得
  
  // 条件に一致するレコードが存在するか確認
  const isMatched = registrations.some((record) => 
    record["メールアドレス"] === myEmail && record["応募相手"] === ""
  );
  
  return isMatched; // 条件に一致するレコードがなければ(募集を投稿していなかったら) true を返す
};
const isMatchedRecordExists2 = (myEmail,Recruitment_flag) => //募集者を投稿していた場合応募者がいなかったら中断ボタン押せるようにする。
{
  const registrations = Registration_Data(); // 全登録データを取得
    // 条件に一致するレコードが存在するか確認
  const isMatched = registrations.some((record) => 
      record["メールアドレス"] === myEmail && record["応募相手"] !== "いない"&& record["応募相手"] !== ""&&Recruitment_flag
  );
    
    return !isMatched; // 登録している人がいなければtrueを返す
};

const Recruitment = ({name,set_Recruitment_flag,Recruitment_flag,set_Apply_flag,Apply_flag}) => //nameでログイン時のアドレス取得
{
  const [recruitmentInput, setRecruitmentInput] = useState({
    recruitment_message: '',
    Developer_or_trustee: '開発者探す',
  });

  const [recruitmentData, setRecruitmentData] = useState([]); // 全募集データ保持する変数作成
  const [My_data, setMyData] = useState(''); // 自分のメールアドレス取得して
  const [stop_button,set_stop_button]=useState(true);

  // 初期データの取得
  useEffect(() => 
  {
    const loadData = () => 
    { 
      const data = fetchRecruitmentData(); // 募集状況データの読み込み
      setRecruitmentData(data); // 全体の募集状況データを読み込
      setMyData(name); // My_data変数に自分のメールアドレスを格納
      const data2=isMatchedRecordExists(name);//自分のレコードの募集状態を変数に格納
      set_Recruitment_flag(data2);//もし募集していた場合はtrueにする
      const data3=isMatchedRecordExists2(name,Recruitment_flag);//募集をしていた場合、自分の所に応募している人がいるか？を変数に格納
      set_stop_button(data3);//もし募集していた場合はfalseにする
    };
    loadData();//最初に一度だけ実行される
  }, []); // 空の依存配列で、コンポーネントがマウントされたときに1回だけ実行
  // 入力内容の変更
  const handleTextChange = (newValue) => 
  {
    setRecruitmentInput((prev) => ({ ...prev, recruitment_message: newValue }));
  };

  const handleDeveloperOrTrusteeChange = (newValue) => 
  {
    setRecruitmentInput((prev) => ({ ...prev, Developer_or_trustee: newValue }));
  };

  const selectOptions = [
    { text: '開発者を探しています!', onSelect: () => handleDeveloperOrTrusteeChange('開発者探す') },
    { text: '受託者を探しています!', onSelect: () => handleDeveloperOrTrusteeChange('受託者探す') },
  ];
//recruitmentDataの返り値の配列で.person_looking_forが開発者になっているレコードだけをまとめた配列を変数に格納
  const developerData = recruitmentData.filter((recruit) => recruit.person_looking_for === '開発者');
//recruitmentDataの返り値の配列で.person_looking_forが受託者になっているレコードだけをまとめた配列を変数に格納
  const trusteeData = recruitmentData.filter((recruit) => recruit.person_looking_for === '受託者');

  // メインコンテナ内の設計の設定
  const layoutData = [
    //条件?{成り立っているときの内容}:{成り立ってない時の内容}
    Apply_flag?{ text: '募集メッセージ入力欄', textSize: 8 }:{text: '応募が完了しました！',textSize: 8},
    
    Apply_flag?{ line_color: 'gray', line_thickness: '3px', line_width: '100%' }:{},
    Apply_flag?Recruitment_flag ? { selectOptions, select_input_text: '応募の種類を選択してください→' }:{ text: '現在募集中です、反応した人がいたらコミュニケーション画面に通知が来ます！', textSize: 8}:{},
    Apply_flag?{ onTextChange : Recruitment_flag &&handleTextChange }:{},
    Apply_flag?{
      sideButtonPosition: 'left',
      buttonText: stop_button?[Recruitment_flag ? '上記の内容で募集を投稿する！' : '現在投稿している募集を中止する！']:['応募者がいるため中止できません！'],
      imageSrc:Recruitment_flag ? null:IMAGE1,
      text:Recruitment_flag ? null:"募集ありがとう！！！！！松岡修造は君を応援しているよ！応募している人がいない間は応募者がいない間は募集を中止することも可能だよ！",
      onClick: () => 
      {

        if (Recruitment_flag) 
        {
          my_Recruitment(recruitmentInput, My_data);
        } 
        else 
        {
          console.log("募集を中止しました。"); // 中止処理
        }
        if(stop_button)set_Recruitment_flag(!Recruitment_flag);
      },
    }:
    {
      text:"応募ありがとう！コミュニケーション画面で募集者の人とチャットをつなごう！",
      textSize: 5,
      imageSrc:IMAGE1,
    },
    Apply_flag?{ line_color: 'gray', line_thickness: '5px', line_width: '100%' }:{},
    Recruitment_flag&&Apply_flag ?{ text: '受託者募集一覧', textSize: 8 }:{},
    //recruit(developerData配列内のデータ)がオブジェクトであれば 「recruit.プロパティ名」 としてオブジェクトのプロパティにアクセスできる
    ...developerData.flatMap((recruit, index) =>//配列.flatMap(){設定}で配列内の各要素全てに対して設定ができる
    Apply_flag?[
      {
        sideButtonPosition:Recruitment_flag ? index % 3 === 0 ? 'left' : index % 3 === 1 ? 'right' : 'center':null,
        buttonText: `この人の募集に応募する！`,
        onClick: () =>
        { 
          if(Apply_flag)
          {
            my_Application(recruit,My_data);//応募する
            set_Apply_flag(false);
          }
        }, // 修正: My_recruitmentData -> myRecruitmentData
        text:Recruitment_flag ? `${recruit.person_looking_for}の${recruit.username} さん:「${recruit.text}」`:null,
        imageSrc:Recruitment_flag ? IMAGE1:null,
      },
      Recruitment_flag ?
      {
        line_color: 'green', // 緑色の線を追加
        line_thickness: '1px',
        line_width: '100%',
      }:{},
    ]:
    [

    ]),
    Recruitment_flag&&Apply_flag  ?{ line_color: 'gray', line_thickness: '5px', line_width: '100%' }:{},
    Recruitment_flag&&Apply_flag  ?{ text: '開発者募集一覧', textSize: 8 }:{},
    //recruit(developerData配列内のデータ)がオブジェクトであれば 「recruit.プロパティ名」 としてオブジェクトの i プロパティにアクセスできる
    ...trusteeData.flatMap((recruit, index) => 
      Apply_flag?[
      {
        sideButtonPosition: Recruitment_flag ?index % 3 === 0 ? 'left' : index % 3 === 1 ? 'right' : 'center':null,
        buttonText: `この人の募集に応募する！`,
        onClick: () => 
        {
          if(Apply_flag)
          {
              my_Application(recruit,My_data);//応募する
              set_Apply_flag(false);
          }
        }, // 修正: My_recruitmentData -> myRecruitmentData
        text:Recruitment_flag ? `${recruit.person_looking_for}の${recruit.username} さん:「${recruit.text}」`:null,
        imageSrc:Recruitment_flag ? IMAGE1:null,
      },
      Recruitment_flag ?
      {
        line_color: 'green', // 緑色の線を追加
        line_thickness: '1px',
        line_width: '100%',
      }:{},
    ]:
    []),
  ];
  return (
    <div>
      <h1>募集画面</h1>
      <MainContainer layoutData={layoutData} recruitmentMessage={recruitmentInput.recruitment_message} handleTextChange={handleTextChange} />
      <div style={{ marginTop: '20px' }}>
      </div>
    </div>
  );
};
export default Recruitment;