# Git cloneの保存場所
動画をダウンロードフォルダに保存するため、ホームディレクトリに読み込む
```terminal
cd ~ 
git clone git@github.com:fujiwara02/multiple_graph.git 
```

# データの配置場所
```terminal
//outputs.pickle(データファイル), movieList.py(データと動画の対応関係)
cd ~\multiple_graph\app\src\component  

//動画(手話動画すべて)
cd ~\multiple_graph\app\src\component\movie  
```

# 手動デプロイ
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
「動画一覧へ」のリンクから飛ぶより、左altで飛んだほうが半分の処理時間で戻れる

