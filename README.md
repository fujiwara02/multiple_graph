# Git cloneの保存場所 (実行は最初の一度きり)
動画をダウンロードフォルダに保存するため、ホームディレクトリに読み込む
```terminal
cd ~ 
git clone git@github.com:fujiwara02/multiple_graph.git 
```

# データの配置場所 (データを変えるとき毎回コピペする)
```terminal
//outputs.pickle(データファイル), movieList.py(データと動画の対応関係)
cd ~\multiple_graph\app\src\component  

//動画(手話動画すべて)
cd ~\multiple_graph\app\src\component\movie  
```

# データファイルを変更した後に実行する (データを変えるとき毎回実行する)
```terminal
cd ~\multiple_graph\app\src\component  
python video_data.py
```

# 手動デプロイ (毎回実行する)
```terminal
cd ~\multiple_graph\app
npm install react-scripts //初回のみ
npm install axios //初回のみ
npm start
```

動画保存する場合は別タブでサーバを起動する
```terminal
cd ~\multiple_graph\app
node server.js
```

## メモ
データファイルの数は、50個以下推奨 (処理時間がかかるため)
「動画一覧へ」のリンクから飛ぶより、左altで飛んだほうが半分の処理時間で戻れる

