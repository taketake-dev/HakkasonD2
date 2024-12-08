const express = require('express');
const router = express.Router();
const {supabase,generateUnusedId} = require('./supabase_wrapper.js');

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
    const { userId, action } = req.body;

    if (!userId || !action) {
        return res.status(400).json({ error: 'userIdとactionが必要ですよ' });
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

    let newOkome =data.okome;
    
    // actionがaddなら+1,subtractなら-1
    if (action === 'add') {
        newOkome += 1;
    } else if (action === 'subtract') {
        newOkome -= 1;
    } else {
        return res.status(400).json({ error: '無効なアクションですよ'});
    }

    // 新しい米ポイントをデータベースに保存
    const { updateError } = await supabase
    .from(table)
    .update({ okome: newOkome })
    .eq('user_id', userId);

    if (updateError) {
        console.error('Error updating data:', updateError);
        return res.status(500).send();
    }

    res.status(200).json({ okome: newOkome});
}
router.post('/update-okome',updateOkome);



module.exports = router;