const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); //.envファイル関連
const router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PASS
const supabase = createClient(supabaseUrl, supabaseKey);

// テーブル名
const table = 'personal';

// 今の米ポイントを取得 API
async function getOkome(req, res){
    const { userId } = req.query; //userId取得
    
    if (!userId) {
        return res.status(400).json({ error: 'userIdが必要ですよ'});
    }

    // personalからokomeを選択user_idを取得
    const { data, error } = await supabase
    .from(table)
    .select('okome')
    .eq('user_id',userId)
    .single();

    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).send();
    }

    res.status(200).json({ okome: data.okome });
}
router.get('/get-okome',getOkome);

// 米ポイントを増減 API
async function updateOkome(req, res){
    const { userId, value } = req.body;

    if (!userId || typeof value !== 'number') {
        return res.status(400).json({ error: 'userIdとvalueが必要ですよ' });
    }

    const { data, error } = await supabase
    .from(table)
    .select('okome')
    .eq('user_id', userId)
    .single();

    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).send();
    }

    const newOkome = data.okome + value; //指定された値を増減

    // 新しい米ポイントをデータベースに保存
    const { updateError } = await supabase
    .from(table)
    .update({ okome: newOkome })
    .eq('user_id', userId);

    if (error) {
        console.error('Error updating data:', updateError);
        return res.status(500).send();
    }

    res.status(200).json({ okome: newOkome});
}
router.post('/update-okome',updateOkome);



module.exports = router;