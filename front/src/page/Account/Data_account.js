import React, { useEffect } from "react";

function Data_account({ formData, decide_address,setCurrentPage}) 
{
  //ーーーーAdd_account は登録情報をデータベースに追加する関数ーーーー
  const Add_account = (record) => 
  {
    // レコードデータをデータベースに追加する処理
    console.log("レコード追加:", record);
    setCurrentPage('profile'); // アカウント作成後にプロフィールページに遷移
  };

  useEffect(() => 
  {
    if(formData && decide_address)
    {
      Add_account(formData);
    }
  }, [formData]);

  return null; // UIを表示しない
}
export default Data_account;
