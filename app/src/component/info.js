// Home.js

import React, { useRef } from "react";
import myArray16 from './datafile/data1/A11.mp4';

const VideoEditor = () => {
  const videoRef = useRef(null);

  const handleDownload = () => {
    // サーバーの/downloadエンドポイントにリクエストを送信
    window.location.href = 'http://localhost:3001/download';
  };

  return (
    <div>
      <video ref={videoRef} controls>
        <source src={myArray16} type="video/mp4" />
      </video>
      
      <button onClick={handleDownload}>Download Video</button>
    </div>
  );
};

export default VideoEditor;



// server.js

const express = require('express');
const path = require('path');

const app = express();
const port = 3001; // 適切なポートに変更

app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', (req, res) => {
  const videoFilePath = path.join(__dirname, './datafile/data1/A11.mp4'); // 実際のファイルパスに変更

  // ダウンロード用のヘッダーを設定
  res.setHeader('Content-Disposition', 'attachment; filename=A11.mp4');

  // 動画ファイルをレスポンスとして送信
  res.sendFile(videoFilePath);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
