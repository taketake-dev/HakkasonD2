process.noDeprecation = true;
const express = require("express");
const {supabase,generateUnusedId}=require("./supabase_wrapper.js")
// ルーターを作成
const router = express.Router();

// プロフィール取得
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// プロフィール更新
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ name, email, bio })
      .eq("id", id);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// モジュールとしてエクスポート
module.exports = router;