# multiple_graph

動画をダウンロードフォルダに保存するため、ホームディレクトリに読み込む
```terminal
cd ~ 
git clone git@github.com:fujiwara02/multiple_graph.git 
```

# 手動デプロイ
```terminal
cd multiple_graph\app
npm install react-scripts //初回のみ
npm install axios //初回のみ
npm start
```

動画保存する場合は別タブでサーバを起動する
```terminal
cd multiple_graph\app
node server.js
```

## How to work

```terminal
git add .
git commit -m "アプリケーションの説明を追加"

git push -u origin main
```
