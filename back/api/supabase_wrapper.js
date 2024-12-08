const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); 
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PASS
const supabase = createClient(supabaseUrl, supabaseKey)
async function isIdUsed(tableName, idColumn, id) {
    try {
        // データベースをクエリしてIDを確認
        const { data, error } = await supabase
            .from(tableName)
            .select(idColumn)
            .eq(idColumn, id)
            .limit(1); // 最初の1件だけ取得すれば十分
        if (error) {
            throw error;
        }
        // dataに結果があるかどうかでIDの使用状況を判断
        return data.length > 0;
    } catch (err) {
        console.error('Error checking ID:', err.message);
        return false;
    }
}
// ランダムIDの生成
function generateRandomId(length = 16) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
// メイン処理
async function generateUnusedId(table,idColumn="id") {
    let id,isUsed;
    do {
        id = generateRandomId();
        isUsed = await isIdUsed(table, idColumn, id);
    } while (isUsed);
    return id;
}
module.exports = {
    supabase,
    generateUnusedId,
};