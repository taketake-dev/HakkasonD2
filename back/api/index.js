// index.js
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const port = 3000;

// ルートエンドポイントにアクセスしたときに「Hello World」を表示
app.get('/',(req, res) => {
    res.send('Hello World');
});

// サーバーの起動
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// サーバーレス関数としてExpressをエクスポート
module.exports.handler = serverless(app);