import React, { useState, useEffect} from 'react';
import * as am5 from '@amcharts/amcharts5';
import './Home.css';
import * as am5xy from '@amcharts/amcharts5/xy';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import * as colorModule from './color_file.js';
import {video_number} from './number_outputs.js';
import movieList from './MovieList';

const Chart = ({randomIndex, onXDataChange, onYDataChange, onZDataChange, onSDataChange, onMovieStop}) => {
  
  const {ans} = useParams(); //何番目の動画か

  useEffect(() => {

    const videoElement = document.createElement('video');
    let long = 10; //動画の長さ
    let start = 0; //startバー(0-1)
    let end = 0; //endバー(0-1)
    let y = 0; //再生箇所(start)
    let z = 0; //再生箇所(end)
    let x_data = 0; //バーの位置を保存(start)
    let y_data = 729.28125; //バーの位置を保存(end)

    let animationActive = false;// アニメーションを制御するフラグ
    let start1 = 0; //アニメーション時にstartを保存
    
    const dynamicModules = {};
    for (let i = 1; i <= video_number; i++) {
      dynamicModules[`dynamicModule${i}`] = require(`./${i}_outputs.js`);
    }

    const values1 = Object.values(dynamicModules[`dynamicModule` + ans]);
    let myArray5 = values1[0]; //all_zero
    let myArray6 = values1[1]; //all_one
    
    videoElement.onloadedmetadata = () => {
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
      button.innerText = '一時停止';
      button.addEventListener('click', () => handleButtonClick2());
      document.getElementById('button-container2').appendChild(button);
      return button;
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

    const createLink = () => {
      const linkContainer = document.createElement('div');
      const link = document.createElement('a');
      link.href = 'https://example.com'; // Set your desired link URL
      link.textContent = 'Click me for the link'; // Set your desired link text
      linkContainer.appendChild(link);
      document.getElementById('link-container').appendChild(linkContainer);
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
    //console.log(scrollValue)

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

//let randomIndex = Math.floor(Math.random() * colorModule.colors.length);
for (let i = 3; i < values1.length; i++) {
  let inf1 = colorModule.colors[randomIndex % colorModule.colors.length];
  randomIndex = randomIndex + 1;

  const series = chart.series.push(am5xy.LineSeries.new(root, {
    name: `Series ${i}`,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: `value${i}`,
    valueXField: "date",
    stroke: `rgba(${inf1[0]},${inf1[1]},${inf1[2]}, 1)`
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
    let rangeTime = rangeDate.getTime();

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

    // タイムスクロールバーをx軸の範囲に固定
    resizeButton.adapters.add("x", function (x) {
      return Math.max(0, Math.min(y_data - 3, x));
    });

    //タイムスクロールバーをx軸の範囲に固定(バーを動かすとき実行される関数)
    resizeButton2.adapters.add("x", function (x) {

      //バーの初期位置を変更する
      if (!resizeButton.isFirstRun) {
        const position1 = xAxis.positionToValue(1);
        range2.set("value", position1);
      }
      return Math.max(0, Math.max(x_data + 3, x));
    });

    //タイムスクロールバーをx軸の範囲に固定(バーを動かすとき実行される関数)
    resizeButton3.adapters.add("x", function (x) {

      //バーの初期位置を変更する
      if (!resizeButton.isMiddleRun) {
        const position = xAxis.positionToValue(0.5);
        range3.set("value", position);
      }
      return Math.max(0, Math.min(chart.plotContainer.width(), x));
    });

    resizeButton.isFirstRun = false; // 右バーの初期位置
    resizeButton.isAnimation = true; // アニメーションを停止

    //まとめ
    function handleButtonClick4() {

      resizeButton.isFirstRun = true;
      resizeButton.isMiddleRun = true;

      animationActive = true; // アニメーションを制御するフラグ
      resizeButton.isAnimation = true;//一時停止を再生状態に変える

      let rangeValue = 0;
      let animationStart; 
      let animationDuration = ((long * 1000) * (z - y)) / (729.28125 * (scrollValue / 100)); // 動画時間 * スライド間計算 / 倍速

      function animateRangeExpansion(timestamp) {
        if (!animationStart) { //アニメーション動作中は作動しない
          animationStart = timestamp;
        }

        const progress = timestamp - animationStart;
        const progressPercentage = Math.min(progress / animationDuration, 1);

        rangeValue = Math.min(progressPercentage, 1);
       
        const newValue = xAxis.positionToValue( y / 729.28125 + rangeValue * (z - y) / 729.28125);//加算(start位置)、掛け算(長さ)
        range3.set("value", newValue);
          
        start = start1 + ((end - start1) * rangeValue);

        if(rangeValue == 1){
          onMovieStop();
          animationActive = false;
        }

        if (progressPercentage < 1 && animationActive) {
          requestAnimationFrame(animateRangeExpansion);
        }
      }

      onZDataChange(scrollValue / 100, y, long); //再生速度、start、end、動画の長さ

      // アニメーション(スクロールバー)を開始
      requestAnimationFrame(animateRangeExpansion);
    }

    //最初から再生
    function handleButtonClick() {
      if(!animationActive){ //アニメーション動作中は作動しない
        y = 0;
        z = 729.28125;
        start = 0;
        end = 1;
        start1 = start; 
        handleButtonClick4();
      } 
    }

    //部分再生
    function handleButtonClick1() {
    
      if(!animationActive){
      y = resizeButton.x(); 
      z = resizeButton2.x();

      start = y / 729.28125
      end = z / 729.28125;
      start1 = start; //アニメーション

      handleButtonClick4();   
      }
    }

    //一時停止
    function handleButtonClick2() {

      if(resizeButton.isAnimation && animationActive){//一時停止
        resizeButton.isAnimation = false;//状態の切り替え(この関数のみ)
        animationActive = false; //カウントを終了するためのフラグ
        onMovieStop();
      }
      else if(!resizeButton.isAnimation && !animationActive){//再生
        y = start * 729.28125;
        z = end * 729.28125;
        start1 = start;
        handleButtonClick4();
      }
    }

    //動画保存
    function handleButtonClick3() {

      // input要素の値を取得
      const inputValue = document.getElementById('input-container').querySelector('input').value;

      // コマンドをプログラムで設定
      let command1 = `C:/Users/mno41/multiple_graph/app/node_modules/ffmpeg-static/ffmpeg.exe -ss `; //使うツール
      let command2 =` -i "C:/Users/mno41/multiple_graph/app/src/component/datafile/data` + ans + `/A` + ans + `1.mp4" -t `; //コピー元動画
      let command3 = ` -c:v copy -c:a copy "C:/Users/mno41/multiple_graph/app/src/component/datafile/record_movie/` + inputValue + `.mp4"`; //コピー先動画

      let start_second = (x_data / 729.28125) * long; //始まる時刻
      let end_second = ((y_data / 729.28125) * long) - ((x_data / 729.28125) * long); //録画時間

      let command = command1 + start_second + (command2) + end_second + (command3);

      const executeCommand = async () => {
        try {
          await axios.post('http://localhost:3001/execute-command', { command })
        } catch (err) {}};
        executeCommand();
    }

    // タイムスクロールバーを移動させるための関数
    resizeButton.events.on("dragged", function () { //左のバー

      //グラフのx座標
      const x = resizeButton.x(); 
      x_data = x;
      onXDataChange(x, long);
      
      //[0~1]の座標
      const position = xAxis.toAxisPosition(x / chart.plotContainer.width());

      //[1696345200000~1700665200000]の座標
      const newValue = xAxis.positionToValue(position);

      //バーの位置を変える
      range.set("value", newValue);

      //start
      seriesRangeDataItem.set("value", newValue);
      seriesRangeDataItem.set("endValue", xAxis.getPrivate("max"));
      });


    // タイムスクロールバーを移動させるための関数
    resizeButton2.events.on("dragged", function () { //右のバー

      //初期位置を設定
      resizeButton.isFirstRun = true;

      //グラフのx座標
      const y = resizeButton2.x(); 
      
      y_data = y;
      
      //[0~1]の座標
      const position = xAxis.toAxisPosition(y / chart.plotContainer.width());

      //[1696345200000~1700665200000]の座標
      const newValue = xAxis.positionToValue(position);
      //console.log(newValue)
      //バーの位置を変える
      range2.set("value", newValue);

      //setX_data(x);
      onYDataChange(y, long);

      //end
      seriesRangeDataItem2.set("value", newValue);
      seriesRangeDataItem2.set("endValue", xAxis.getPrivate("min"));
    });

    // タイムスクロールバーを移動させるための関数 
    resizeButton3.events.on("dragged", function () { //真ん中のバー

      //初期位置を設定
      resizeButton.isMiddleRun = true;

      //グラフのx座標
      const z = resizeButton3.x(); 
      
      //[0~1]の座標
      const position = xAxis.toAxisPosition(z / chart.plotContainer.width());

      //[1696345200000~1700665200000]の座標
      const newValue = xAxis.positionToValue(position);
      
      range3.set("value", newValue);//バーの位置を変える
      onSDataChange(z, long);

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

      

    <div className="title31">

      {/* AmChartsのグラフ */}
      <div id="chartdiv" style={{ width: '800px', height: '160px' }}></div>
    </div>
  </div>
  );
};
export default Chart;