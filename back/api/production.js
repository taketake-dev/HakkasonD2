const express = require('express');
const router = express.Router();
const culudinary = require('./cludinary_wrapper.js');
const {supabase,generateUnusedId} = require('./supabase_wrapper.js');
const table="produc"




async function getall(req, res){
  const { id } = req.params; 
  const {data,error}=await supabase.from(table).select("*").eq("id",id);
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    res.json({ids:objects.map(obj => obj.id)})
  }
  
}
router.get('/creator/:id',getall);


async function postdata(req, res){
  const {type,creator} = req.data
 
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  } 
  const id=await generateUnusedId(produc)
  const {data,error}=await supabase.from(table).insert([{id: id,creator:creator,type:type,url:file.path}]);
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    res.json({id:id})
  }
}
router.post('/',culudinary.single("file"),postdata);

function getPublicIdFromUrl(url) {
  const regex = /\/([^/]+)\.(jpg|jpeg|png|gif|bmp|webp|svg)$/;
  const matches = url.match(regex);
  if (matches) {
    return matches[1];  // public_id
  }
  return null;  // 無効なURLの場合
}

async function delldata(req, res){
  const { id } = req.params; 
  const {data,error}=await supabase.from(table).select("*").eq("id",id).single();
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    const culudinary_id=getPublicIdFromUrl(data.url);
    try {
      const result = await cloudinary.uploader.destroy(culudinary_id);
      if (result.result === 'ok') {
        console.log('File deleted successfully');
        res.json({success:true})
      } else {
        console.log('Failed to delete file');
        res.json({success:false})
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).send();
    }
  }
}
router.delete('/:id',delldata);


async function gettype(req, res){
  const {data,error} = await supabase.from("roles").select("*");
  if (error) {
    console.error('Error inserting data:', error);
    res.status(500).send();
  }
  else{
    res.json(data);
  }
}
router.get('/:id',gettype);



module.exports = router;