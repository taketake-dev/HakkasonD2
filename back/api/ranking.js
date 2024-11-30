const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();



async function getranking(req, res){
}
router.get('/',getranking);

async function getdetail(req, res){
}
router.get('/:id',getdetail);



module.exports = router;