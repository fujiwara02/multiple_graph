import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Micro from '@amcharts/amcharts5/themes/Micro';

import * as dynamicModule1 from './1_outputs.js';
import * as dynamicModule2 from './2_outputs.js';
import * as dynamicModule3 from './3_outputs.js';
import * as dynamicModule4 from './4_outputs.js';
import * as dynamicModule5 from './5_outputs.js';
import * as dynamicModule6 from './6_outputs.js';
import * as dynamicModule7 from './7_outputs.js';
import * as dynamicModule8 from './8_outputs.js';
import * as dynamicModule9 from './9_outputs.js';
import * as dynamicModule10 from './10_outputs.js';
import * as dynamicModule11 from './11_outputs.js';
import * as dynamicModule12 from './12_outputs.js';
import * as dynamicModule13 from './13_outputs.js';
import * as dynamicModule14 from './14_outputs.js';
import * as dynamicModule15 from './15_outputs.js';
import * as dynamicModule16 from './16_outputs.js';
import * as dynamicModule17 from './17_outputs.js';
import * as dynamicModule18 from './18_outputs.js';
import * as dynamicModule19 from './19_outputs.js';

import myArray17 from './image/1.jpg';
import myArray27 from './image/2.jpg';
import myArray37 from './image/3.jpg'
import myArray47 from './image/4.jpg';
import myArray57 from './image/5.jpg';
import myArray67 from './image/6.jpg';
import myArray77 from './image/7.jpg';
import myArray87 from './image/8.jpg';
import myArray97 from './image/9.jpg';
import myArray107 from './image/10.jpg';
import myArray117 from './image/11.jpg';
import myArray127 from './image/12.jpg';
import myArray137 from './image/13.jpg';
import myArray147 from './image/14.jpg'; 
import myArray157 from './image/15.jpg';
import myArray167 from './image/16.jpg';
import myArray177 from './image/17.jpg';
import myArray187 from './image/18.jpg'; 
import myArray197 from './image/19.jpg';


const StockCharts = () => {

  useEffect(() => {
    const tickers = [ //要素の名前
      "001-私の父は車を買いました", "002-私はあなたが好き", "003-私の兄は仕事に行く", "004-父は映画を見るのが好き",
      "005-弟は海に遊びに行く","006-兄の趣味はサッカー","007-母は仕事に行く","008-私は山に行きます",
      "009-あなたはサッカーを見る","010-あなたは山で遊びました","011-私の兄は車を買いました",
      "012-私は兄が好き","013-私の父は仕事に行く","014-母は山に遊びに行く",
      "015-父の趣味はサッカー","016-兄は仕事に行く","017-父は海に行きました","018-弟はサッカーを見る",
      "019-私は山で遊びました"
    ];


    let n = 0;
    tickers.forEach(ticker => {

      n = n + 1;
      const data = generateData(n); //20個の点

      const chartContainer = document.createElement('div');//行の要素
      chartContainer.style.width = '100%'; //各要素の横幅
      chartContainer.style.height = '50px'; //各要素の縦幅
      
      document.getElementById('chartdiv').appendChild(chartContainer); //chartに描画
      renderChartRow(ticker, chartContainer, data, n); //要素を指定

    });

  }, []);

  let combinedArrays = { dynamicModule1, dynamicModule2, dynamicModule3, dynamicModule4, dynamicModule5, dynamicModule6, 
    dynamicModule7, dynamicModule8, dynamicModule9, dynamicModule10, dynamicModule11, dynamicModule12, dynamicModule13, 
    dynamicModule14, dynamicModule15, dynamicModule16, dynamicModule17, dynamicModule18, dynamicModule19};

  let combinedArrays7 = { myArray17, myArray27, myArray37, myArray47, myArray57, myArray67, myArray77, myArray87, myArray97,
    myArray107, myArray117, myArray127, myArray137, myArray147, myArray157, myArray167, myArray177, myArray187, myArray197};
  

  // Generate random data
  const generateData = (n) => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);

    
    const data = [];
    const values1 = Object.values(combinedArrays['dynamicModule' + n]);
    console.log(values1)
    for (let i = 0; i < values1[0].length; ++i) {

      
      let value = values1[3][i];
      let value1 = values1[4][i];
      let value2 = values1[5][i];
      let value3 = values1[6][i];
      let value4 = values1[7][i];
      let value5 = values1[0][i]; //all_zero
     
      
      am5.time.add(date, "day", 1);
      data.push({
        date: date.getTime(),
        value: value,
        value1: value1,
        value2: value2,
        value3: value3,
        value4: value4,
        value5: value5,
       
      });
    }
    return data;
  }

  const renderChartRow = (ticker, container, data, n) => {
    const row = document.createElement("div"); //1行のコンテナ
    row.style.borderBottom = "1px solid #eee"; //1pxのボーダーを作成
    row.style.clear = "left"; //改行
    container.appendChild(row); //親要素にこの行を追加

    // 画像の要素を作成してスタイルを設定
    const col = document.createElement("img");
    col.src = combinedArrays7['myArray'+ n +'7']; // 画像のパスを指定
    col.style.width = "81.4px"; // 画像の幅
    col.style.height = "60px"; // 画像の高さを自動調整
    col.style.padding = "0.27em 1.2em 0em 0.7em"; //上、右、下、左
    col.style.float = "left";
    row.appendChild(col); // col3 内に画像を追加

    const col3 = document.createElement("div");
    col3.style.fontSize = "2em";
    col3.style.width = "30%";
    col3.style.height = "35px";
    col3.style.padding = "0.3em 1em 0.3em 0em";
    col3.style.float = "left";
    row.appendChild(col3);
    createValueChart(col3, data); //グラフ

    const col1 = document.createElement("div");
    col1.innerHTML = ticker;
    col1.style.fontSize = "1.8em";
    col1.style.width = "30%";
    col1.style.padding = "0.55em 0em 0.2em 1em";
    col1.style.float = "left";
    row.appendChild(col1); //タイトル

    


    // リンクを作成
    const link = document.createElement("a");
    link.href = "/Home_movie/" + n; // リンク先URLを指定
    link.textContent = ticker + "を見る"; // リンクの表示テキスト

    // スタイルを設定
    link.style.textDecoration = "none"; // 下線をなくす（リンクスタイルを変更する場合）
    link.style.color = "blue"; // リンクの色を変更するなど、必要なスタイルを追加

    link.style.fontSize = "1em";
    link.style.width = "20%";
    link.style.height = "35px";
    link.style.padding = "2em 0em 0em 0em";
    link.style.float = "left";

    row.appendChild(link); // col3 内にリンクを追加b
 

  }

  const createValueChart = (container, data) => {
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


    const seriesData = [
      { valueYField: "value", stroke: am5.color(0x00b300) },
      { valueYField: "value1", stroke: am5.color(0x0000b3) },
      { valueYField: "value2", stroke: am5.color(0xFFFF00) },
      { valueYField: "value3", stroke: am5.color(0xFFA500) },
      { valueYField: "value4", stroke: am5.color(0xFF0000) },
      { valueYField: "value5", stroke: am5.color(0x000000) }
    ];
    
    for (let i = 0; i < seriesData.length; i++) {
      const series = chart.series.push(am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: seriesData[i].valueYField,
        valueXField: "date",
        stroke: seriesData[i].stroke
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
