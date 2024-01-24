import React, {useEffect} from 'react';
import * as am5 from '@amcharts/amcharts5'; //グラフ作成
import './Home.css'; //css(デザイン)
import * as am5xy from '@amcharts/amcharts5/xy';
import {useParams } from 'react-router-dom'; //前画面からの要素を習得
import axios from 'axios'; //動画保存
import * as colorModule from './color_file.js'; //グラフに使用するカラーの一覧
import {video_number} from './number_outputs.js'; //動画の数
import movieList from './MovieList'; //動画の順番一覧
import { ToastContainer, toast } from 'react-toastify'; //保存メッセージ表示用
import 'react-toastify/dist/ReactToastify.css';

const Chart = ({randomIndex, onXDataChange, onYDataChange, onZDataChange, onSDataChange, onEDataChange, onMovieStop}) => { //Home_movieの関数を呼び出す
  
  const {ans} = useParams(); //何番目の動画か
  useEffect(() => {
    const videoElement = document.createElement('video');
    let long = 10; //動画の長さ
    let animationActive = false;// アニメーションを制御するフラグ(falseは停止)
    let start = 0; //動画の開始位置[0-1の範囲で表す]
    let end = 1; //動画の終了位置[0-1の範囲で表す]
    let timeline = 0.5; //タイムラインバーの位置[0-1の範囲で表す]
      
    const dynamicModules = {}; //データファイルの配列
    for (let i = 1; i <= video_number; i++) { //動画の数だけループ
      dynamicModules[`dynamicModule${i}`] = require(`./${i}_outputs.js`); //データファイル読み込み
    }

    const values1 = Object.values(dynamicModules[`dynamicModule` + ans]); //ans番目のデータのみを代入
    let myArray5 = values1[0]; //すべて0のファイル
    let myArray6 = values1[1]; //すべて1のファイル
    
    videoElement.onloadedmetadata = () => { //動画の長さを習得する関数
      long = videoElement.duration; //動画の長さ
    };
    videoElement.src = require('./movie/'+movieList[ans]+'.mp4'); //動画の場所を読み込む

    const createButton = () => { //ボタンを作成する
      const button = document.createElement('button');
      button.innerText = '最初から再生'; //表示するテキスト
      button.addEventListener('click', () => handleButtonClick()); //handleButtonClick関数を呼び出す
      document.getElementById('button-container').appendChild(button);
      return button;
    };

    const createButton1 = () => { //ボタンを作成する
      const button = document.createElement('button');
      button.innerText = '部分再生'; //表示するテキスト
      button.addEventListener('click', () => handleButtonClick1()); //handleButtonClick1関数を呼び出す
      document.getElementById('button-container1').appendChild(button);
      return button;
    };

    const createButton2 = () => { //ボタンを作成する
      const button = document.createElement('button');
      button.innerText = '再生ー停止'; //表示するテキスト
      button.addEventListener('click', () => handleButtonClick2()); //handleButtonClick2関数を呼び出す
      document.getElementById('button-container2').appendChild(button);
      return button;
    };

    const createButton3 = () => { //ボタンを作成する
      const button = document.createElement('button');
      button.innerText = '動画保存'; //表示するテキスト
      const inputContainer = document.getElementById('input-container');
      const existingInput = inputContainer.querySelector('input');
      
      if (!existingInput) {createInput();} //存在していない場合のみ名前入力欄を作成する
      button.addEventListener('click', () => handleButtonClick3()); //handleButtonClick2関数を呼び出す
      document.getElementById('button-container3').appendChild(button);
      return button;
    };

    const createInput = () => { //名前入力欄
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', 'Enter Name'); //表示するテキスト
      document.getElementById('input-container').appendChild(input);
      return input;
    };

    let scrollValue = 100; //スクロールバーの初期値
    const handleScrollChange = (event) => {
      scrollValue = event.target.value;
    };
    const scrollbar = document.createElement('input'); 
    scrollbar.type = 'range';
    scrollbar.min = '25'; //最小値
    scrollbar.max = '100'; //最大値
    scrollbar.value = scrollValue;
    scrollbar.addEventListener('input', handleScrollChange);
    document.getElementById('scrollbar-container').appendChild(scrollbar); 

    const showToast = () => { //動画保存時に保存成功メッセージを表示させる
      toast.success('ダウンロードに保存しました', {
        position: 'top-right', 
        autoClose: 3000, //表示時間(ミリ秒)
        hideProgressBar: false, 
        closeOnClick: true, //クリックしたときに閉じるかどうか
        pauseOnHover: true, //マウスオーバー時に一時停止するかどうか
        draggable: true, // トーストをドラッグできるかどうか
        progress: undefined, 
      });
    };
    
    const root = am5.Root.new("chartdiv");
    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,       // X軸方向のドラッグを無効に
      panY: false,       // Y軸方向のドラッグを無効に
      wheelX: "none",    // マウスホイールによる拡大縮小を無効に
      wheelY: "none",    // マウスホイールによる拡大縮小を無効に
      pinchZoomX: false , // ピンチジェスチャーによる拡大縮小を無効に
    }));

    const legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
    }));

    legend.data.setAll([{
      name: "Under budget",
      color: am5.color(0x297373)
    }, {
      name: "Over budget",
      color: am5.color(0xff621f)
    }]);

    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {//x軸をグラフに追加している
      baseInterval: {
        timeUnit: "second",
        count: 0
      },
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {  //y軸をグラフに追加している
      renderer: am5xy.AxisRendererY.new(root, {}),
      min: 0, //y軸の最小値
      max: 1.0, //y軸の最大値
    }));

    const series_start = chart.series.push(am5xy.LineSeries.new(root, { //左スクロールバーの左側をグレーで塗りつぶす
      name: "Series", 
      xAxis: xAxis, 
      yAxis: yAxis, 
      valueYField: "value", 
      valueXField: "date", 
      stroke: "",
      fill: am5.color(0x000000) // 黒色に塗りつぶすための設定
    }));

    const data_start = myArray6.map((value, index) => ({ 
      date:  index * 8400 , //8400はデータの数と秒数を対応させる
      value: value,
    }));
    series_start.data.setAll(data_start);

    series_start.fills.template.setAll({ //塗りつぶすのに必要
      fillOpacity: 0.2,
      visible: true,      
    });

    const series_end = chart.series.push(am5xy.LineSeries.new(root, { //右スクロールバーの右側をグレーで塗りつぶす
      name: "Series",  
      xAxis: xAxis, 
      yAxis: yAxis, 
      valueYField: "value", 
      valueXField: "date",
      stroke: "",
      fill: am5.color(0x000000) //黒色に塗りつぶすための設定
    }));
    
    const data_end = myArray6.map((value, index) => ({
      date:  index * 8400 , //8400はデータの数と秒数を対応させる
      value: value,
    }));
    series_end.data.setAll(data_end);

    series_end.fills.template.setAll({ //塗りつぶすのに必要
      fillOpacity: 0.2,
      visible: true
    });
    const seriesConfigs = [];

    for (let i = 3; i < values1.length; i++) { //単語のグラフをすべて描画する
      let inf1 = colorModule.colors[randomIndex % colorModule.colors.length]; //別ファイルからRGBを呼び出す
      randomIndex = randomIndex + 1; //連続した色を使う

      const series = chart.series.push(am5xy.LineSeries.new(root, {
        name: `Series ${i}`,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: `value${i}`,
        valueXField: "date",
        stroke: `rgba(${inf1[0]},${inf1[1]},${inf1[2]}, 1)`,
      }));

      const data = values1[i].map((value, dataIndex) => ({
        date: dataIndex * 8400,
        [`value${i}`]: value
      }));
      series.data.setAll(data);
      seriesConfigs.push(series); 
    }

    const series_black = chart.series.push(am5xy.LineSeries.new(root, { //すべての要素が0の黒い線を描画
      name: "Series 5", 
      xAxis: xAxis,     
      yAxis: yAxis,     
      valueYField: "value5",
      valueXField: "date",  
      stroke: "rgba(0, 0, 0, 0.5)", //線の色を黒色に設定
    }));
    
    const data_black = myArray5.map((value, index) => ({
      date:  index * 8400 , //8400はデータの数と秒数を対応させる
      value5: value 
    }));
    series_black.data.setAll(data_black);

    let rangeDate = new Date();
    am5.time.add(rangeDate, "day", Math.round(series_start.dataItems.length / 2));
  
    const seriesRangeDataItem = xAxis.makeDataItem({}); //スクロールバー(start)
    const seriesRange = series_start.createAxisRange(seriesRangeDataItem);
    seriesRange.fills.template.setAll({ //片方だけ塗られている状態にする
      visible: false,
      opacity: 0.35 //透明度
    });
    
    const seriesRangeDataItem2 = xAxis.makeDataItem({}); //スクロールバー(end)
    const seriesRange2 = series_end.createAxisRange(seriesRangeDataItem2);    
    seriesRange2.fills.template.setAll({ //片方だけ塗られている状態にする
      visible: false,
      opacity: 0.35 //透明度
    });
    
    const seriesRangeDataItem3 = xAxis.makeDataItem({}); //タイムラインバー
    const range = xAxis.createAxisRange(xAxis.makeDataItem({}));//スクロールバー(start)を追加
    const range2 = xAxis.createAxisRange(xAxis.makeDataItem({}));//スクロールバー(end)を追加
    const range3 = xAxis.createAxisRange(xAxis.makeDataItem({}));//タイムスクロールバーを追加
  
    range.get("grid").setAll({
      strokeOpacity: 1, //線の不透明度
      stroke: "rgba(255, 255, 255, 1)", //スクロールバー(start)の色を指定
      strokeWidth:2
    });

    range2.get("grid").setAll({
      strokeOpacity: 1, //線の不透明度
      stroke: "rgba(255, 255, 255, 1)", //スクロールバー(end)の色を指定
      strokeWidth:2
    });

    range3.get("grid").setAll({
      strokeOpacity: 1, //線の不透明度
      stroke: "rgba(255, 255, 255, 1)", //タイムスクロールバーの色を指定
      strokeWidth:1.4
    });

    const resizeButton = am5.Button.new(root, { //ボタンの外観や動作をカスタマイズ
      themeTags: ["resize", "horizontal"],
      icon: am5.Graphics.new(root, {
        themeTags: ["icon"],
      })
    });

    const resizeButton2 = am5.Button.new(root, { //ボタンの外観や動作をカスタマイズ
      themeTags: ["resize", "horizontal"],
      icon: am5.Graphics.new(root, {
        themeTags: ["icon"],
      })
    });

    const resizeButton3 = am5.Button.new(root, { //ボタンの外観や動作をカスタマイズ
      themeTags: ["resize", "horizontal"],
      width: 20,
      height: 20,
    });

    //スクロールバー(start)をy軸の範囲に固定
    resizeButton.adapters.add("y", function () {
      return 0;
    });

    //スクロールバー(end)をy軸の範囲に固定
    resizeButton2.adapters.add("y", function () {
      return 0;
    });

    //タイムスクロールバーをy軸の範囲に固定
    resizeButton3.adapters.add("y", function () {
      return 0;
    });

    //スクロールバー(start)(バーを動かすとき実行される関数)
    resizeButton.adapters.add("x", function (x) {
      return Math.max(0, Math.min(end * 729.28125 - 3, x));//スクロールバー(start)がスクロールバー(end)より後ろに行かないように
    });

    //スクロールバー(end)(バーを動かすとき実行される関数)
    resizeButton2.adapters.add("x", function (x) {
      if (!resizeButton.isFirstRun) { //スクロールバー(end)が一度も動いていないとき
        const position1 = xAxis.positionToValue(1); //初期位置を1(右端)にする
        range2.set("value", position1); //移動させる
      }
      return Math.min(729.28125, Math.max(start * 729.28125 + 3, x));//スクロールバー(end)がスクロールバー(start)より前に行かないように
    });

    //タイムラインバー(バーを動かすとき実行される関数)
    resizeButton3.adapters.add("x", function (x) {
      if (!resizeButton.isMiddleRun) { //タイムラインバーが一度も動いていないとき
        const position = xAxis.positionToValue(0.5); //初期位置を0.5(真ん中)にする
        range3.set("value", position); //移動させる
      }
      return Math.max(0, Math.min(chart.plotContainer.width(), x));
    });

    resizeButton.isFirstRun = false; // スクロールバー(end)が一度も動いていない
    resizeButton.isAnimation = false; // 一時停止を切り替えるフラグ(trueは一時停止していない)

    //最初から再生、部分再生、一時停止(再開時)に使用する
    function handleButtonClick4() {

      resizeButton.isFirstRun = true; //スクロールバー(end)の初期位置を解除
      resizeButton.isMiddleRun = true; //タイムラインバーの初期位置を解除
      animationActive = true; //アニメーションを再生中に変える
      resizeButton.isAnimation = true; //アニメーションフラグを再生中に変える(handleButtonClick2で使用)

      let animationStart; //animateRangeExpansion開始フラグ
      let animationDuration = ((long * 1000) * (end - start)) / (scrollValue / 100); //再生時間(動画時間 * スライド間計算[0-1] / 倍速)

      function animateRangeExpansion(timestamp) {
        if (!animationStart) { //最初のみ実行
          animationStart = timestamp; //timestampは時間関数で、初期値を代入する
        }
        const progress = timestamp - animationStart; //開始からの時間計測
        const progressPercentage = Math.min(progress / animationDuration, 1); //再生時間における現在の割合[0-1]
        const newValue = xAxis.positionToValue(start + progressPercentage * (end - start)); //初期位置＋時間経過の割合*再生箇所の長さ
        range3.set("value", newValue); //バーを移動する
        
        timeline = start + ((end - start) * progressPercentage); //初期位置＋時間経過の割合*再生箇所の長さ
        onEDataChange(timeline, long); //右下に表示される数値を変える

        if(progressPercentage == 1){ //最後まで達したら
          onMovieStop(); //Home_movieで動画を止める
          animationActive = false; //アニメーションを停止にする
          resizeButton.isAnimation = false; //アニメーションフラグを停止に変える
          end = 1;
        }
        if (progressPercentage < 1 && animationActive) { //最後まで達するか、一時停止されるまで
          requestAnimationFrame(animateRangeExpansion); //アニメーションを続ける
        }
      }
      onZDataChange(scrollValue / 100, start * 729.28125, long); //Home_movieで動画を再生(再生速度、start、動画の長さ)
      requestAnimationFrame(animateRangeExpansion);// アニメーションを開始
    }

    //最初から再生
    function handleButtonClick() {
      if(resizeButton.isAnimation && animationActive){//一時停止(フラグ(再生時) & アニメーション(再生時))
        resizeButton.isAnimation = false; //フラグを停止に変える
        animationActive = false; //アニメーションを停止する
        onMovieStop(); //動画を停止する
      }
      else if(!resizeButton.isAnimation && !animationActive){//再生(フラグ(一時停止時) & アニメーション(一時停止時))
        start = 0;     //動画の再生開始位置[0-1]
        end = 1;       //動画の再生終了位置[0-1]
        timeline = start; //タイムラインバーをstartの位置にする
        handleButtonClick4(); //動画再生
      }
    }

    //部分再生
    function handleButtonClick1() {
      if(resizeButton.isAnimation && animationActive){//一時停止(フラグ(再生時) & アニメーション(再生時))
        resizeButton.isAnimation = false; //フラグを停止に変える
        animationActive = false; //アニメーションを停止する
        onMovieStop(); //動画を停止する
      }
      else if(!resizeButton.isAnimation && !animationActive){//再生(フラグ(一時停止時) & アニメーション(一時停止時))
        start = resizeButton.x() / 729.28125; //動画の再生開始位置[0-1]
        end = resizeButton2.x() / 729.28125;  //動画の再生終了位置[0-1]
        timeline = start; //タイムラインバーをstartの位置にする
        handleButtonClick4(); //動画再生
      }
    }

    //一時停止、その位置から再生
    function handleButtonClick2() {
      if(resizeButton.isAnimation && animationActive){//一時停止(フラグ(再生時) & アニメーション(再生時))
        resizeButton.isAnimation = false; //フラグを停止に変える
        animationActive = false; //アニメーションを停止する
        onMovieStop(); //動画を停止する
      }
      else if(!resizeButton.isAnimation && !animationActive){//再生(フラグ(一時停止時) & アニメーション(一時停止時))
        if(timeline != end){
        start = timeline; //タイムラインバーの位置を代入
        handleButtonClick4(); //動画再生
        }
      }
    }

    //動画保存
    function handleButtonClick3() {
      const inputValue = document.getElementById('input-container').querySelector('input').value;
      let command1 = `"./node_modules/ffmpeg-static/ffmpeg.exe" -ss `; //使うツール
      let command2 =` -i "./src/component/movie/`+ movieList[ans] + `.mp4" -t `; //コピー元動画
      let command3 = ` -c:v copy -c:a copy "../../Downloads/` + inputValue + `.mp4"`; //コピー先動画

      let start_second = start * long; //始まる時刻
      let end_second = (end * long) - (start * long); //録画時間
      let command = command1 + start_second + (command2) + end_second + (command3); //連結する

      const executeCommand = async () => { //サーバー側に送る
        try {
          await axios.post('http://localhost:3001/execute-command', { command })
        } catch (err) {}};

      executeCommand(); 
      showToast(); //保存成功
    }
  
    resizeButton.events.on("dragged", function () { //スクロールバー(start)を動かしたときに実行させる関数
      start = resizeButton.x() / 729.28125; //動画の開始位置を更新する
      onXDataChange(start * 729.28125, long); //スクロールバー(start)の秒数を送る
      const position = xAxis.toAxisPosition(start * 729.28125 / chart.plotContainer.width()); //[0~1]の座標
      const newValue = xAxis.positionToValue(position); //[1696345200000~1700665200000]の座標

      range.set("value", newValue); //バーの位置を変える
      seriesRangeDataItem.set("value", newValue);//マークを移動する
      seriesRangeDataItem.set("endValue", xAxis.getPrivate("max"));//左側を塗る
      });

    resizeButton2.events.on("dragged", function () { //スクロールバー(end)を動かしたときに実行させる関数
      resizeButton.isFirstRun = true; 
      end = resizeButton2.x() / 729.28125; //動画の終了位置を更新する
      onYDataChange(end * 729.28125, long);//スクロールバー(start)の秒数を送る
      const position = xAxis.toAxisPosition(end * 729.28125 / chart.plotContainer.width()); //[0~1]の座標
      const newValue = xAxis.positionToValue(position); //[1696345200000~1700665200000]の座標

      range2.set("value", newValue); //バーの位置を変える
      seriesRangeDataItem2.set("value", newValue);//マークを移動する
      seriesRangeDataItem2.set("endValue", xAxis.getPrivate("min"));//右側を塗る
    });

    // タイムスクロールバーを移動させるための関数 
    resizeButton3.events.on("dragged", function () { //タイムラインバーを動かしたときに実行させる関数

      resizeButton.isMiddleRun = true;
      timeline = resizeButton3.x() / 729.28125;//動画の現在位置を更新する
      const position = xAxis.toAxisPosition(timeline * 729.28125 / chart.plotContainer.width()); //[0~1]の座標
      const newValue = xAxis.positionToValue(position); //[1696345200000~1700665200000]の座標
     
      range3.set("value", newValue);//バーの位置を変える
      onSDataChange(timeline * 729.28125, long);//バーと動画を対応させている
      seriesRangeDataItem3.set("value", newValue);//マークを移動する
      seriesRangeDataItem3.set("endValue", xAxis.getPrivate("min"));
    });

    range.set("bullet", am5xy.AxisBullet.new(root, { //スクロールバー(start)を動かすマークを表示
      sprite: resizeButton
    }));
    
    range2.set("bullet", am5xy.AxisBullet.new(root, { //スクロールバー(end)を動かすマークを表示
      sprite: resizeButton2
    }));

    range3.set("bullet", am5xy.AxisBullet.new(root, { //タイムラインバーを動かすマークを表示
      sprite: resizeButton3
    }));
   
    const button = createButton();
    const button1 = createButton1();
    const button2 = createButton2();
    const button3 = createButton3();

    return () => {
      chart.dispose();
      scrollbar.removeEventListener('input', () => {});
      document.getElementById('scrollbar-container').removeChild(scrollbar);//スクロールバー

      button.removeEventListener('click', () => {});
      document.getElementById('button-container').removeChild(button);//最初から再生

      button1.removeEventListener('click', () => {});
      document.getElementById('button-container1').removeChild(button1);//部分再生

      button2.removeEventListener('click', () => {});
      document.getElementById('button-container2').removeChild(button2);//再生ー停止

      button3.removeEventListener('click', () => {});
      document.getElementById('button-container3').removeChild(button3);//動画保存

      videoElement.onloadedmetadata = null;
    };
  }, []);

  return (    
  <div>
      <a className="title32">
      <a id="button-container"></a></a>

      <a className="title34">
      <a id="button-container1"></a></a>

      <a className="title35">
      <a id="button-container2"></a></a>

      <a className="title36">
      0.25倍 <a id="scrollbar-container"></a> 1.00倍</a>

      <a className="title37">
      <a id="input-container"></a></a>

      <a className="title38">
      <a id="button-container3"></a></a>
      <ToastContainer />

    <div className="title31">

      {/* AmChartsのグラフ */}
      <div id="chartdiv" style={{ width: '800px', height: '160px' }}></div>
    </div>
  </div>
  );
};
export default Chart;