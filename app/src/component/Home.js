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
    createValueChart(col3, data, n); //グラフの設定

    const col1 = document.createElement("div");
    col1.innerHTML = ticker;
    col1.style.fontSize = "1.8em";
    col1.style.width = "30%";
    col1.style.padding = "0.55em 0em 0.2em 1em";
    col1.style.float = "left"; //要素が重ならないように左側に回り込ませる
    row.appendChild(col1); //タイトル

    // リンクを作成
    const link = document.createElement("a");
    link.href = "/Home_movie/" + n; // リンク先URLを指定
    link.textContent = ticker + "を見る"; // リンクの表示テキスト
    link.style.textDecoration = "none"; // 下線をなくす（リンクスタイルを変更する場合）
    link.style.color = "blue"; // リンクの色を変更するなど、必要なスタイルを追加
    link.style.fontSize = "1em";
    link.style.width = "20%";
    link.style.height = "35px";
    link.style.padding = "2em 0em 0em 0em";
    link.style.float = "left"; //要素が重ならないように左側に回り込ませる

    row.appendChild(link); // col3 内にリンクを追加b
  }

  const createValueChart = (container, data, n) => {
    const root = am5.Root.new(container);

    root.setThemes([
      am5themes_Micro.new(root)
    ]);

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none"
    }));

    chart.plotContainer.set("wheelable", false);
    chart.zoomOutButton.set("forceHidden", true);

    
    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    maxDeviation: 0,
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {})
  }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      strictMinMax: true,
      extraMax: 0.02,
      extraMin: 0.02,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    const series = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      stroke: am5.color(0x00b300)
    }));

    series.strokes.template.setAll({
      strokeWidth: 2
    });
    series.data.setAll(data);

    console.log(n);
    for (let i = 1; i < Object.keys(data[0]).length; i++) { //グラフのデータと色決め
      let randomIndex = Math.floor(Math.random() * colorModule.colors.length);
      let inf1 = colorModule.colors[randomIndex];

      const series = chart.series.push(am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: i === Object.keys(data[0]).length - 1 ? "value0" : "value" + i,
        valueXField: "date",
        stroke: i === Object.keys(data[0]).length - 1 ? am5.color(0x000000) : `rgb(${inf1[0]}, ${inf1[1]}, ${inf1[2]})`,
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