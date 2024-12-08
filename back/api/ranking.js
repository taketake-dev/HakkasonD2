const express = require('express');
const {supabase,generateUnusedId} = require('./supabase_wrapper.js');
const router = express.Router();
const table="login"


async function getranking(req, res){
}
router.get('/',getranking);

async function getdetail(req, res){
}
router.get('/:id',getdetail);



module.exports = router;