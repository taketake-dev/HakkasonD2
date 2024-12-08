// Data_communication.
//---------------データベースからデータの取得↓-----------------
export const Registration_Data = () => //登録情報が入ったデータベースのデータすべて取得する関数
{
    return [
      { ユーザーネーム: "AA", パスワード: "", メールアドレス: "", 応募相手: "いない", 募集相手: "" ,米ポイント:0},
      { ユーザーネーム: "BB", パスワード: "B", メールアドレス: "B", 応募相手: "いない", 募集相手: "",米ポイント:0},
      { ユーザーネーム: "CC", パスワード: "C", メールアドレス: "C", 応募相手: "いない", 募集相手: "" ,米ポイント:0},
      { ユーザーネーム: "DD", パスワード: "D", メールアドレス: "username123456789012345678901234567890123456789012345678901234567890@example.comaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.com", 応募相手: "いない", 募集相手: "" ,米ポイント:0}
    ];
};
//---------------データベースからデータの取得↑-----------------
const Data_communication = (myEmail) => //chatできる相手がいるかを探す関数
{
  const registrations = Registration_Data(); // 全登録データを取得

  // 条件に一致するレコードのユーザーネームを抽出
  const matchedUsernames = registrations
    .filter(
      (record) =>
        record["募集相手"] === myEmail || // 募集相手が自分のメールアドレス
        (record["メールアドレス"] === myEmail && record["応募相手"] !== "いない") // 自分のメールアドレスのレコードに応募相手が存在
    )
    .map((record) => record["ユーザーネーム"]); // ユーザーネームを取得

  return matchedUsernames; // ユーザーネームのリストを返す
};

export default Data_communication;

/*
const Data_communication = async () => 
    {
        
      try 
      {
        // バックエンドAPIのエンドポイントURL（例: http://localhost:5000/messages）
        const response = await fetch("http://localhost:5000/messages");
        if (!response.ok)throw new Error("データの取得に失敗しました");
        // JSON形式でデータを取得
        let data = await response.json();
        // 取得したデータをそのまま返す
        return data; // 例: [{ username: 'Alice', text: 'こんにちは！' }, ...]
      } 
      catch (error)// 
      {
        console.error("エラー:", error);
        return []; // エラー時は空配列を返す
      }
    };
  */