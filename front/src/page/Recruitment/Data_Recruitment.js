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
// 募集状況データベースに新しい募集データを追加する関数
export const AddRecruitmentData = (appliedUserEmail) => 
{
  // ここで、新しい募集データをデータベースに追加する処理を記述します
  // 仮にコンソールに出力して処理が行われたことを確認する場合
  console.log(`募集データを追加しました: ${appliedUserEmail}`);
};

// 自分の登録情報を更新する関数
export const updateMyData = (email, fieldToUpdate) => 
{
  // ここで、データベース内の自分の登録情報を更新する処理を記述します
  // 仮にコンソールに出力して更新内容を確認する場合
  console.log(`メールアドレス: ${email} の情報を ${fieldToUpdate} に更新しました`);
  // 実際には、データベースの更新操作が必要になります
};

// 募集状況管理データベースから指定されたメールアドレスのデータを削除する関数
export const DeleteRecruitmentData = (appliedUserEmail) => 
{
  // ここで、指定されたメールアドレスの募集データをデータベースから削除する処理を記述します
  // 仮にコンソールに出力して削除操作を確認する場合
  console.log(`募集データを削除しました: ${appliedUserEmail}`);
};

// 必要に応じて、データベースの操作部分を適切に実装してください

export const my_Registration_Data= (My_address) => //メールアドレス情報を基に登録情報保存されたデータベース内の一部テーブルを取得する関数
{
    return { ユーザーネーム: "AA", パスワード: "", メールアドレス: "", 応募相手: "いない", 募集相手: "" };
}//👈これまだ作り途中の関数だから！！！！！！！！！！！！！

//fetchRecruitmentData・・・募集でデータベースの読み込み関数
//Registration_Data ・・・登録データベースの読み込み関数
//AddRecruitmentData・・・募集データベースに新規募集データ追加関数
//DeleteRecruitmentData・・・募集データからメールアドレスを基に募集レコード削除
//my_Registration_Data・・・メールアドレスを基に自分の登録データのあるレコードを取得
//updateMyData・・・既存のデータベース内の特定のメールアドレスの登録データのレコード内容を変更する

//ーーーーーこれ以降上はデータベースプログラムーーーーーーーーーーーー

export const my_Recruitment = async (recruitmentInput) => 
{
  // 引数で受け取った情報を展開
  const { recruitment_message, Developer_or_trustee,My_address} = recruitmentInput;//募集が投稿されたらその情報を取得する
  const userData = my_Registration_Data(My_address);//送られてきたメールアドレスもとに自分の登録情報レコードを取得
  // 新しい募集データを作成
  const newRecruitment = 
  {
    username: userData?.[0]?.username || "未設定", // 投稿した人のユーザーネームを決定
    text: recruitment_message, //投稿文決定
    person_looking_for: Developer_or_trustee, // 開発者か受託者か？の情報を決定
    mail_address: My_address || "不明", //メールアドレス決定
  };
  AddRecruitmentData(newRecruitment);//新しく募集データをデータベースに加える
  if(userData?.[0]?.メールアドレス)updateMyData(userData[0].メールアドレス, "いない");// 自分の登録情報の応募相手欄を「いない」に変更
  
  // 追加したデータを返す
  return newRecruitment;
};

// my_Application 内で my_RecruitmentData の呼び出しを修正
export const my_Application = async (recruit, myRecruitmentData) => 
{
  //recruitで押したボタンの募集を投稿した人のメールアドレス情報を受け取ることが可能
  //myRecruitmentDataで自分のログイン時のメールアドレスを取得可能
  const appliedUserEmail = recruit.mail_address;//応募した募集データの投稿者のメールアドレスを変数に格納
  //const userData = my_Registration_Data(appliedUserEmail); // 投稿者の登録情報のレコードを取得
  updateMyData(myRecruitmentData, appliedUserEmail,"募集相手"); //自分のメールアドレス情報を基に自分の募集相手の欄を「募集相手：相手のメールアドレス」に変更する
  updateMyData(appliedUserEmail,myRecruitmentData,"応募相手"); //格納された相手のメールアドレスを基に相手の応募相手の欄を「応募相手：自分のメールアドレス」に変更する
  DeleteRecruitmentData(appliedUserEmail);//募集状況管理データベースからその人の募集レコードを削除
  return 0;
};

/*
export const my_Application=async()=>//応募した際に相手の登録データを開いて相手の応募相手の欄を「自分のメールアドレス」に変更し、自分の募集相手の欄を「相手のメールアドレス」に変更
{
//この関数で必要な処理5つ
//募集状況管理しているデータベース開くーー処理1
//開いたデータベースから自分が応募した人のメールアドレスを取得ーー処理2
//全userの登録情報が入ったデータベースから、取得したメールアドレスと同じメールアドレスを保持するユーザーテーブル取得ーー処理3
//取得したテーブル内の、応募相手の欄を「自分のメールアドレス」に変更する。ーー処理4
//自分のメールアドレスから、自分の登録情報の記録が載っているテーブルの募集相手の欄を「相手のメールアドレス」に変更ーー処理5
}

export const my_Recruitment=async()=>
{
  //この関数で必要な処理4つ
  //登録情報管理しているデータベース開くーー処理1
  //開いたデータベースの中から取得した自分のテーブルの内容取得ーー処理2
  //募集を開始した瞬間募集欄に募集状況管理しているデータベースに新しくデータを追加ーー処理3
  // ┗--→追加テーブルの例{ username: "○○", text: "こんにちは！あたしのサイト作ってよ！ばか！", person_looking_for: "受託者" ,mail_address:"aaaaa"},
  //自分の登録データの応募相手の欄を「いない」に変更する処理ーー処理4
}
//登録されているデータからマッチング相手がいるかを探す
*/

//ーーー捕捉ーーー
  //募集相手の欄:
  //応募をそもそもしていないばあい「""」が入る
  //応募をした場合「"募集者のメールアドレス"」が入る
  
  //応募相手の欄:
  //募集をそもそもしていないばあい「""」が入る
  //募集したさい「"いない"」が入る
  //募集して誰かが応募した際「"応募した人のメールアドレス"」が入る


  //それぞれの人
  //chat後、米ポイントが足りなかったら募集欄、応募欄ともに「""」になる。
 
  //