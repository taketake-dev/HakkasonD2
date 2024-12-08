const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());  // JSON形式のリクエストボディを解析
app.use(express.urlencoded({ extended: true }));  // URLエンコードされたデータの解析
app.use(cors());

const port = 5000;

app.use("/login",require('./login.js'));
app.use("/ranking",require('./ranking.js'));
app.use("/point",require('./point.js'));
app.use("/production",require('./production.js'));

// ルートエンドポイントにアクセスしたときに「Hello World」を表示
app.get('/', (req, res) => {
    res.send('Hello World');
});

// サーバーの起動
app.listen(port, () => {
    console.log(`Server is running at http:localhost:${port}`);
});