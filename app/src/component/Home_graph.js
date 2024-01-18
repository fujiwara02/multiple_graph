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
    videoElement.src = require('./movie/'+movieList[ans]+'.mp4'); 

    const createButton = () => {
      const button = document.createElement('button');
      button.innerText = '最初から再生';
      button.addEventListener('click', () => handleButtonClick());
      document.getElementById('button-container').appendChild(button);
      return button;
    };

    const createButton1 = () => {
      const button = document.createElement('button');
      button.innerText = '部分再生';
      button.addEventListener('click', () => handleButtonClick1());
      document.getElementById('button-container1').appendChild(button);
      return button;
    };

    const createButton2 = () => {
      const button = document.createElement('button');
      button.innerText = '再生ー停止';
      button.addEventListener('click', () => handleButtonClick2());
      document.getElementById('button-container2').appendChild(button);
      return button;
    };

    const showToast = () => {
      toast.success('ダウンロードに保存しました', {
        position: 'top-right', // トーストの表示位置
        autoClose: 3000, // ミリ秒単位で表示時間を指定
        hideProgressBar: false, // プログレスバーの表示・非表示
        closeOnClick: true, // トーストをクリックしたときに閉じるかどうか
        pauseOnHover: true, // マウスオーバー時に一時停止するかどうか
        draggable: true, // トーストをドラッグできるかどうか
        progress: undefined, // プログレスバーの設定
      });
    };

    const createButton3 = () => {
      const button = document.createElement('button');
      button.innerText = '動画保存';
      const inputContainer = document.getElementById('input-container');
      const existingInput = inputContainer.querySelector('input');
      
      if (!existingInput) {createInput();}
      button.addEventListener('click', () => handleButtonClick3());
      document.getElementById('button-container3').appendChild(button);
      return button;
    };

    const createInput = () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', 'Enter Name');
      document.getElementById('input-container').appendChild(input);
      return input;
    };

    let scrollValue = 100;
    const handleScrollChange = (event) => {
      scrollValue = event.target.value;
    };
    
    // スクロールバーの初期化
    const scrollbar = document.createElement('input');
    scrollbar.type = 'range';
    scrollbar.min = '25';
    scrollbar.max = '100';
    scrollbar.value = scrollValue;
    scrollbar.addEventListener('input', handleScrollChange);

    // スクロールバーをDOMに追加
    document.getElementById('scrollbar-container').appendChild(scrollbar);

    //　グラフの描画領域を指定
    const root = am5.Root.new("chartdiv");

    //拡大、縮小を可能にする
    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,       // X軸方向のドラッグを無効に
      panY: false,       // Y軸方向のドラッグを無効に
      wheelX: "none",    // マウスホイールによる拡大縮小を無効に
      wheelY: "none",    // マウスホイールによる拡大縮小を無効に
      pinchZoomX: false , // ピンチジェスチャーによる拡大縮小を無効に
    }));

    // 凡例を生成
    const legend = chart.children.push(am5.Legend.new(root, {
      // ここに凡例の設定を追加
      centerX: am5.percent(50),
      x: am5.percent(50),
    }));

    // 凡例データを設定
    legend.data.setAll([{
      name: "Under budget",
      color: am5.color(0x297373)
    }, {
      name: "Over budget",
      color: am5.color(0xff621f)
    }]);

    //x軸をグラフに追加している
    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: "second",
        count: 0
      },
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

    //y軸をグラフに追加している
    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
      min: 0, // Set the minimum value for the Y-axis
      max: 1.0, // Set the maximum value for the Y-axis
    }));

    // all_one(start)スクロールバー用のデータを追加
    const series_start = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series", //名前指定
      xAxis: xAxis, //使用するX軸を指定（日付軸）
      yAxis: yAxis, //使用するy軸を指定(値軸)
      valueYField: "value", //valueのデータをx軸にplot
      valueXField: "date", //dataのデータをy軸にplot
      stroke: "",
      fill: am5.color(0x000000) // 黒色に塗りつぶすための設定
    }));
    
    // myArrayからのall_one(start)データを代入している
    const data_start = myArray6.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value: value,
    }));
    series_start.data.setAll(data_start);

    //塗りつぶすのに必要
    series_start.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,      
    });

    // all_one(end)スクロールバー用のデータを追加
    const series_end = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series", //名前指定
      xAxis: xAxis, //使用するX軸を指定（日付軸）
      yAxis: yAxis, //使用するy軸を指定(値軸)
      valueYField: "value", //valueのデータをx軸にplot
      valueXField: "date", //dataのデータをy軸にplot
      stroke: "",
      fill: am5.color(0x000000) // 黒色に塗りつぶすための設定
    }));
    
    // myArrayからのall_one(end)データを代入している
    const data_end = myArray6.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value: value,
    }));
    series_end.data.setAll(data_end);

    //塗りつぶすのに必要
    series_end.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true
    });
    const seriesConfigs = [];

    for (let i = 3; i < values1.length; i++) {
      let inf1 = colorModule.colors[randomIndex % colorModule.colors.length];
      randomIndex = randomIndex + 1;

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

    // 黒で上書き
    const series_black = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 5", // 新しいデータシリーズの名前
      xAxis: xAxis,     // 使用するX軸を指定（日付軸）
      yAxis: yAxis,     // 使用するY軸を指定（値軸）
      valueYField: "value5", // 新しいデータシリーズのY軸データフィールド
      valueXField: "date",   // X軸に対応するデータフィールド
      stroke: "rgba(0, 0, 0, 0.5)", // 線の色を黒色に設定
    }));
    
    // 新しいデータを代入（myArray5は新しいデータ配列）
    const data_black = myArray5.map((value, index) => ({
      date:  index * 8400 , //50フレーム50秒(1000)　//50フレーム420秒(8400)
      value5: value // 新しいデータシリーズのY軸データ
    }));
    series_black.data.setAll(data_black);

    let rangeDate = new Date();
    am5.time.add(rangeDate, "day", Math.round(series_start.dataItems.length / 2));
  
    //定義(start)
    const seriesRangeDataItem = xAxis.makeDataItem({});
    const seriesRange = series_start.createAxisRange(seriesRangeDataItem);

    //片方だけ塗られている状態にする
    seriesRange.fills.template.setAll({
      visible: false,
      opacity: 0.35
    });

    //定義(end)
    const seriesRangeDataItem2 = xAxis.makeDataItem({});
    const seriesRange2 = series_end.createAxisRange(seriesRangeDataItem2);

    //片方だけ塗られている状態にする
    seriesRange2.fills.template.setAll({
      visible: false,
      opacity: 0.35
    });
    
    const seriesRangeDataItem3 = xAxis.makeDataItem({});//定義(middle)
    const range = xAxis.createAxisRange(xAxis.makeDataItem({}));//タイムスクロールバーを追加
    const range2 = xAxis.createAxisRange(xAxis.makeDataItem({}));
    const range3 = xAxis.createAxisRange(xAxis.makeDataItem({}));
  
    range.get("grid").setAll({
      strokeOpacity: 1, //線の不透明度
      stroke: "rgba(255, 255, 255, 1)", //タイムスクロールバーの色を指定
      strokeWidth:2
    });

    range2.get("grid").setAll({
      strokeOpacity: 1, //線の不透明度
      stroke: "rgba(255, 255, 255, 1)", //タイムスクロールバーの色を指定
      strokeWidth:2
    });

    range3.get("grid").setAll({
      strokeOpacity: 1, //線の不透明度
      stroke: "rgba(255, 255, 255, 1)", //タイムスクロールバーの色を指定
      strokeWidth:1.4
    });

    const resizeButton = am5.Button.new(root, {
      themeTags: ["resize", "horizontal"], //ボタンの外観や動作をカスタマイズ
      icon: am5.Graphics.new(root, {
        themeTags: ["icon"],
      })
    });

    const resizeButton2 = am5.Button.new(root, {
      themeTags: ["resize", "horizontal"],
      icon: am5.Graphics.new(root, {
        themeTags: ["icon"],
      })
    });

    const resizeButton3 = am5.Button.new(root, {
      themeTags: ["resize", "horizontal"],
      width: 20,
      height: 20,
    });

    //タイムスクロールバーをy軸の範囲に固定
    resizeButton.adapters.add("y", function () {
      return 0;
    });

    //タイムスクロールバーをy軸の範囲に固定
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
        range2.set("value", position1);
      }
      return Math.min(729.28125, Math.max(start * 729.28125 + 3, x));//スクロールバー(end)がスクロールバー(start)より前に行かないように
    });

    //タイムラインバー(バーを動かすとき実行される関数)
    resizeButton3.adapters.add("x", function (x) {
      if (!resizeButton.isMiddleRun) { //タイムラインバーが一度も動いていないとき
        const position = xAxis.positionToValue(0.5); //初期位置を0.5(真ん中)にする
        range3.set("value", position); //代入する
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

      let rangeValue = 0; //グラフの範囲を超えないように
      let animationStart; //animateRangeExpansion開始フラグ
      let animationDuration = ((long * 1000) * (end - start)) / (scrollValue / 100); //再生時間(動画時間 * スライド間計算[0-1] / 倍速)

      function animateRangeExpansion(timestamp) {
        if (!animationStart) { //最初のみ実行
          animationStart = timestamp; //timestampは時間関数で、初期値を代入する
        }
        const progress = timestamp - animationStart; //開始からの時間計測
        const progressPercentage = Math.min(progress / animationDuration, 1); //タイムラインバーがグラフの範囲を超えないようにする
        rangeValue = Math.min(progressPercentage, 1); 
        const newValue = xAxis.positionToValue(start + rangeValue * (end - start));//加算(start位置)、掛け算(長さ)
        range3.set("value", newValue);
        
        timeline = start + ((end - start) * rangeValue);
        onEDataChange(timeline, long);

        if(rangeValue == 1){
          onMovieStop();
          animationActive = false;
          resizeButton.isAnimation = false;
          timeline = resizeButton.x() / 729.28125;
        }
        if (progressPercentage < 1 && animationActive) {
          requestAnimationFrame(animateRangeExpansion);
        }
      }
      onZDataChange(scrollValue / 100, start * 729.28125, long); //Home_movie(再生速度、start、動画の長さ)
      requestAnimationFrame(animateRangeExpansion);// アニメーションを開始
    }

    //最初から再生
    function handleButtonClick() {
      if(!animationActive){ //アニメーション動作中は作動しない
        start = 0;     //動画の再生開始位置[0-1]
        end = 1;       //動画の再生終了位置[0-1]
        timeline = start; //タイムラインバーをstartの位置にする
        handleButtonClick4(); //動画再生
      } 
    }

    //部分再生
    function handleButtonClick1() {
      if(!animationActive){ //アニメーション動作中は作動しない
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
        start = timeline; //タイムラインバーの位置を代入
        handleButtonClick4(); //動画再生
      }
    }

    //動画保存
    function handleButtonClick3() {
      // input要素の値を取得
      const inputValue = document.getElementById('input-container').querySelector('input').value;

      // コマンドをプログラムで設定
      let command1 = `"./node_modules/ffmpeg-static/ffmpeg.exe" -ss `; //使うツール
      let command2 =` -i "./src/component/movie/`+ movieList[ans] + `.mp4" -t `; //コピー元動画
      let command3 = ` -c:v copy -c:a copy "../../Downloads/` + inputValue + `.mp4"`; //コピー先動画

      let start_second = start * long; //始まる時刻
      let end_second = (end * long) - (start * long); //録画時間
      let command = command1 + start_second + (command2) + end_second + (command3);

      const executeCommand = async () => {
        try {
          await axios.post('http://localhost:3001/execute-command', { command })
        } catch (err) {}};

        executeCommand();
        showToast(); //保存成功
    }
  
    // タイムスクロールバーを移動させるための関数
    resizeButton.events.on("dragged", function () { //左のバー
      start = resizeButton.x() / 729.28125;
      onXDataChange(start * 729.28125, long);
      const position = xAxis.toAxisPosition(start * 729.28125 / chart.plotContainer.width()); //[0~1]の座標
      const newValue = xAxis.positionToValue(position); //[1696345200000~1700665200000]の座標

      range.set("value", newValue); //バーの位置を変える
      seriesRangeDataItem.set("value", newValue);
      seriesRangeDataItem.set("endValue", xAxis.getPrivate("max"));
      });

    // タイムスクロールバーを移動させるための関数
    resizeButton2.events.on("dragged", function () { //右のバー
      resizeButton.isFirstRun = true; //初期位置を設定
      end = resizeButton2.x() / 729.28125;
      const position = xAxis.toAxisPosition(end * 729.28125 / chart.plotContainer.width()); //[0~1]の座標
      const newValue = xAxis.positionToValue(position); //[1696345200000~1700665200000]の座標

      range2.set("value", newValue); //バーの位置を変える
      onYDataChange(end * 729.28125, long);
      seriesRangeDataItem2.set("value", newValue);
      seriesRangeDataItem2.set("endValue", xAxis.getPrivate("min"));
    });

    // タイムスクロールバーを移動させるための関数 
    resizeButton3.events.on("dragged", function () { //真ん中のバー

      resizeButton.isMiddleRun = true; //初期位置を設定
      timeline = resizeButton3.x() / 729.28125;
      const position = xAxis.toAxisPosition(timeline * 729.28125 / chart.plotContainer.width()); //[0~1]の座標
      const newValue = xAxis.positionToValue(position); //[1696345200000~1700665200000]の座標
    
      range3.set("value", newValue);//バーの位置を変える
      onSDataChange(timeline * 729.28125, long);
      seriesRangeDataItem3.set("value", newValue);
      seriesRangeDataItem3.set("endValue", xAxis.getPrivate("min"));
    });

    // タイムスクロールバーを動かすマークを表示
    range.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: resizeButton
    }));
    
    // タイムスクロールバーを動かすマークを表示
    range2.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: resizeButton2
    }));

    // タイムスクロールバーを動かすマークを表示
    range3.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: resizeButton3
    }));
   
    const button = createButton();
    const button1 = createButton1();
    const button2 = createButton2();
    const button3 = createButton3();

    return () => {
      chart.dispose();
      scrollbar.removeEventListener('input', () => {});
      document.getElementById('scrollbar-container').removeChild(scrollbar);

      button.removeEventListener('click', () => {});
      document.getElementById('button-container').removeChild(button);

      button1.removeEventListener('click', () => {});
      document.getElementById('button-container1').removeChild(button1);

      button2.removeEventListener('click', () => {});
      document.getElementById('button-container2').removeChild(button2);

      button3.removeEventListener('click', () => {});
      document.getElementById('button-container3').removeChild(button3);

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