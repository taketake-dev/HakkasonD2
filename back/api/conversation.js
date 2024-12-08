const express = require('express');
const router = express.Router();
const {supabase,generateUnusedId} =require("./supabase_wrapper.js")
const table="conversation"





module.exports = router;

/*
# conversation
##
##
##
##
会話の取り消し
会話の送信
会話の取得
会話の選択肢提示
*/