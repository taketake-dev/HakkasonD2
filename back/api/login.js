const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();



async function postlogin(req, res){
}
router.post('/',postlogin);

async function postsignup(req, res){
}
router.post('/signup',postsignup);

async function postloginmail(req, res){
}
router.post('/mail',postloginmail);



module.exports = router;