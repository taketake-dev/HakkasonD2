const express = require('express');
const router = express.Router();
const {supabase,generateUnusedId} =require("./supabase_wrapper.js")
const table="login"

async function postlogin(req, res){
    const { id, pass } = req.body;
    
    const {data,error} = await supabase.from(table).select("*").eq("user_id",id).single();
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
      res.json({ success: data[0].password==pass });
    }
}
router.post('/',postlogin);

async function getlogin(req, res){
    const {data,error} = await supabase.from(table).select("*");
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
        res.json(data);
    }
           
}
router.get('/',getlogin);

async function postsignup(req, res){
    const { id, pass,name } = req.body; 

    const {data,error} = await supabase.from(table).insert([{uesr_id: id,uesr_name:name,password: pass}]);
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send();
    }
    else{
        res.json({ success:data });
    }
}
router.post('/signup',postsignup);

async function postloginmail(req, res){
}
router.post('/email',postloginmail);



module.exports = router;