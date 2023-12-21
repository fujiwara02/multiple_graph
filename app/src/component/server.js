const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = 3001;

app.use(express.json());

app.post('/execute-command', async (req, res) => {
  const { command } = req.body;

  try {
    // コマンドを実行
    await exec(command);

    // サーバー上で保存された動画ファイルのパス
    const savedFilePath = path.join(__dirname, 'path/to/saved/file.mp4');

    // サーバー上の動画ファイルを読み取り、クライアントに送信
    const videoData = await fs.readFile(savedFilePath);

    // クライアントに動画データを返す
    res.json({ videoData });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
