## Git cloneの保存場所 (実行は最初の一度きり)
動画をダウンロードフォルダに保存するため、ホームディレクトリに読み込む
```terminal
cd ~ 
git clone https://github.com/Kimura-Lab-NIT-Toyota/multiple_graph.git 
```
gitがインストールされていない場合は(https://git-scm.com/downloads)

## データの配置場所 (データを変えるときコピペする)
outputs.pickle(データファイル), movieList.py(データと動画の対応関係)を以下の場所に
```terminal
cd ~\multiple_graph\app\src\component  
```
動画(手話動画すべて)を以下の場所に
```terminal
cd ~\multiple_graph\app\src\component\movie  
```

## データファイルを変更した後に実行する (データを変えるとき実行する)
プログラムの場所へ移動
```terminal
cd ~\multiple_graph\app\src\component 
``` 
pythonがインストールされてない場合
```terminal
python                    
```
初回のみ実行
```terminal
pip install torch         
pip install scikit-learn  
pip install opencv-python
```
プログラムを実行して、データファイルを作成する
```terminal
python video_data.py
```

## 手動デプロイ (毎回実行する)

npmがインストールされていない場合は、https://nodejs.org/en
```terminal
cd ~\multiple_graph\app
```
初回のみ実行
```terminal
npm install react-scripts 
npm install axios        
```
webページを起動させる
```terminal
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

動画の読み込みに時間がかかる時があるため、グラフが終わっても動画が最後まで到達しないことがある
