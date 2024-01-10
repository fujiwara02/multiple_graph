import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Micro from '@amcharts/amcharts5/themes/Micro'; //座標軸なしグラフ
import {video_number} from './number_outputs.js'; //動画の数
import * as colorModule from './color_file.js'; //グラフの色

const StockCharts = () => {

  const dynamicModules = {}; //データファイル配列作成
  const image = {}; //画像ファイル配列作成
  for (let i = 1; i <= video_number; i++) {
    dynamicModules[`dynamicModule${i}`] = require(`./${i}_outputs.js`); //データファイル読み込み
    image[`image${i}`] = require(`./image/${i}.jpg`); //画像ファイル読み込み
  }

  const myArrayList = []; //画面に表示する単語ファイルの配列を作成
  for (let ans = 1; ans <= video_number; ans++) { 
    const values1 = Object.values(dynamicModules['dynamicModule' + ans]); //データファイルを読み込み
    let myArray = values1[2]; //単語ファイルのみを代入
    const concatenatedString = myArray.join(', '); //要素の間にコンマとスペースを追加する
    myArrayList.push(concatenatedString); //代入する
  }

  useEffect(() => {
    for (let n = 1; n <= video_number; n++) { //1要素ごとに実行する
      const data = generateData(n); //データの読み込み

      const chartContainer = document.createElement('div'); //div要素を作成
      chartContainer.style.width = '100%'; //各要素の横幅
      chartContainer.style.height = '50px'; //各要素の縦幅

      document.getElementById('chartdiv').appendChild(chartContainer); //chartに代入
      renderChartRow(myArrayList[n-1], chartContainer, data, n); //一行毎の要素構成やスペースなどを作成
    }
  }, []);

  const generateData = (n) => { //グラフデータ読み込み
    let date = new Date();
    date.setHours(0, 0, 0, 0); //時間をセット

    const data = []; //グラフのデータ配列を作成
    const values1 = Object.values(dynamicModules['dynamicModule' + n]); //データファイルの読み込み

    for (let i = 0; i < values1[0].length; ++i) {//時系列ごとにすべてのグラフの要素を実行(時系列の回数実行)

      am5.time.add(date, "day", 1); //時間設定
      let obj = {
        date: date.getTime(), //時間
        value0: values1[0][i], //グラフを見やすくするための黒い線
      };

      for (let j = 3; j < values1.length; ++j) { //values1の要素3以降がデータ配列のため
        obj[`value${j-2}`] = values1[j][i]; //グラフの数値を代入(グラフの数だけ実行)
      }
      data.push(obj); //データ配列にpush(時系列回)
    }
    return data;
  }

  const renderChartRow = (ticker, container, data, n) => { //一行ごとの要素構成やスペースを指定する
    const row = document.createElement("div"); //div要素を作成
    row.style.borderBottom = "1px solid #eee"; //要素間に1pxの線を作成
    row.style.clear = "left"; //改行
    container.appendChild(row);

    const col = document.createElement("img"); //img要素を作成
    col.src = image['image' + n]; //使う画像を指定
    col.style.width = "81.4px"; // 画像の幅
    col.style.height = "60px"; // 画像の高さ
    col.style.padding = "0.27em 1.2em 0em 0.7em"; //上、右、下、左のスペース
    col.style.float = "left"; //要素が重ならないように左側に回り込ませる
    row.appendChild(col); 

    const col3 = document.createElement("div"); //div要素を作成
    col3.style.fontSize = "2em"; //グラフの大きさを指定
    col3.style.width = "30%"; //グラフの幅
    col3.style.height = "35px"; //グラフの高さ
    col3.style.padding = "0.3em 1em 0.3em 0em"; //上、右、下、左のスペース
    col3.style.float = "left"; //要素が重ならないように左側に回り込ませる
    row.appendChild(col3);
    createValueChart(col3, data, n); //グラフを作成する

    const col1 = document.createElement("div");//div要素を作成
    col1.innerHTML = ticker;
    col1.style.fontSize = "1.8em"; //フォントの大きさ
    col1.style.width = "30%"; //横幅
    col1.style.padding = "0.55em 0em 0.2em 1em";//上、右、下、左のスペース
    col1.style.float = "left"; //要素が重ならないように左側に回り込ませる
    row.appendChild(col1); //タイトル

    // リンクを作成
    const link = document.createElement("a");
    link.href = "/Home_movie/" + n; //リンク先URLを指定
    link.textContent = ticker + "を見る"; //リンクの表示テキスト
    link.style.textDecoration = "none"; //下線をなくす
    link.style.color = "blue"; //リンクの色
    link.style.fontSize = "1em"; //フォントの大きさ
    link.style.width = "20%"; //リンクの幅
    link.style.height = "35px"; //リンクの縦幅
    link.style.padding = "2em 0em 0em 0em"; //上、右、下、左のスペース
    link.style.float = "left"; //要素が重ならないように左側に回り込ませる
    row.appendChild(link); 
  }

  const createValueChart = (container, data, n) => {
    const root = am5.Root.new(container);

    root.setThemes([ //軸の数値を表示しない小さなグラフを作成
      am5themes_Micro.new(root)
    ]);
    //chart(グラフ)を作成する
    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false, //スライドを不能にする
      panY: false, //スライドを不能にする
      wheelX: "none", //拡大を不能にする
      wheelY: "none" //拡大を不能にする
    }));

    chart.plotContainer.set("wheelable", false); //ズーム操作できない
    chart.zoomOutButton.set("forceHidden", true); //ズームアウトボタンを非表示に

    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, { //X軸を作成する
    maxDeviation: 0, //データの最大ずれ(データがX軸の範囲外にならないように)
    baseInterval: { timeUnit: "day", count: 1 }, //ベースの時間間隔を1日に設定
    renderer: am5xy.AxisRendererX.new(root, {})
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { //Y軸を作成する
      strictMinMax: true, //データがy軸の範囲外にならないように
      extraMax: 0.02, //最大値に追加される空白の割合
      extraMin: 0.02, //最小値に追加される空白の割合
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    for (let i = 1; i < Object.keys(data[0]).length; i++) { //グラフの数プラス1回
      let randomIndex = Math.floor(Math.random() * colorModule.colors.length); //乱数を発生させる
      let inf1 = colorModule.colors[randomIndex]; //乱数のRGBを入手する

      const series = chart.series.push(am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: i === Object.keys(data[0]).length - 1 ? "value0" : "value" + i, //最後のみ全て0の線を描画する(valueはデータの数値は入っている)
        valueXField: "date",
        stroke: i === Object.keys(data[0]).length - 1 ? am5.color(0x000000) : `rgb(${inf1[0]}, ${inf1[1]}, ${inf1[2]})`, //最後のみ黒を描画(それ以外は乱数)
      }));
    
      series.strokes.template.setAll({
        strokeWidth: 2
      });
      series.data.setAll(data);
    } 
  }
  return (
    <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default StockCharts;