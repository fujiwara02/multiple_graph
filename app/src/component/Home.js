import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Micro from '@amcharts/amcharts5/themes/Micro';


import myArray10 from './datafile/data1/1_outputs0.js';
import myArray11 from './datafile/data1/1_outputs1.js'; 
import myArray12 from './datafile/data1/1_outputs2.js'; 
import myArray13 from './datafile/data1/1_outputs3.js'; 
import myArray14 from './datafile/data1/1_outputs4.js'; 
import myArray15 from './datafile/data1/1_outputs_allzero.js';
import myArray17 from './datafile/data1/A10.jpg';

import myArray20 from './datafile/data2/2_outputs0.js';
import myArray21 from './datafile/data2/2_outputs1.js'; 
import myArray22 from './datafile/data2/2_outputs2.js'; 
import myArray23 from './datafile/data2/2_outputs3.js'; 
import myArray24 from './datafile/data2/2_outputs4.js'; 
import myArray25 from './datafile/data2/2_outputs_allzero.js';
import myArray27 from './datafile/data2/A20.jpg';

import myArray30 from './datafile/data3/3_outputs0.js';
import myArray31 from './datafile/data3/3_outputs1.js'; 
import myArray32 from './datafile/data3/3_outputs2.js'; 
import myArray33 from './datafile/data3/3_outputs3.js'; 
import myArray34 from './datafile/data3/3_outputs4.js'; 
import myArray35 from './datafile/data3/3_outputs_allzero.js';
import myArray37 from './datafile/data3/A30.jpg';

import myArray40 from './datafile/data4/4_outputs0.js';
import myArray41 from './datafile/data4/4_outputs1.js'; 
import myArray42 from './datafile/data4/4_outputs2.js'; 
import myArray43 from './datafile/data4/4_outputs3.js'; 
import myArray44 from './datafile/data4/4_outputs4.js'; 
import myArray45 from './datafile/data4/4_outputs_allzero.js';
import myArray47 from './datafile/data4/A40.jpg';

import myArray50 from './datafile/data5/5_outputs0.js';
import myArray51 from './datafile/data5/5_outputs1.js'; 
import myArray52 from './datafile/data5/5_outputs2.js'; 
import myArray53 from './datafile/data5/5_outputs3.js'; 
import myArray54 from './datafile/data5/5_outputs4.js'; 
import myArray55 from './datafile/data5/5_outputs_allzero.js';
import myArray57 from './datafile/data5/A50.jpg';

import myArray60 from './datafile/data6/6_outputs0.js';
import myArray61 from './datafile/data6/6_outputs1.js'; 
import myArray62 from './datafile/data6/6_outputs2.js'; 
import myArray63 from './datafile/data6/6_outputs3.js'; 
import myArray64 from './datafile/data6/6_outputs4.js'; 
import myArray65 from './datafile/data6/6_outputs_allzero.js';
import myArray67 from './datafile/data6/A60.jpg';

import myArray70 from './datafile/data7/7_outputs0.js';
import myArray71 from './datafile/data7/7_outputs1.js'; 
import myArray72 from './datafile/data7/7_outputs2.js'; 
import myArray73 from './datafile/data7/7_outputs3.js'; 
import myArray74 from './datafile/data7/7_outputs4.js'; 
import myArray75 from './datafile/data7/7_outputs_allzero.js';
import myArray77 from './datafile/data7/A70.jpg';

import myArray80 from './datafile/data8/8_outputs0.js';
import myArray81 from './datafile/data8/8_outputs1.js'; 
import myArray82 from './datafile/data8/8_outputs2.js'; 
import myArray83 from './datafile/data8/8_outputs3.js'; 
import myArray84 from './datafile/data8/8_outputs4.js'; 
import myArray85 from './datafile/data8/8_outputs_allzero.js';
import myArray87 from './datafile/data8/A80.jpg';

import myArray90 from './datafile/data9/9_outputs0.js';
import myArray91 from './datafile/data9/9_outputs1.js'; 
import myArray92 from './datafile/data9/9_outputs2.js'; 
import myArray93 from './datafile/data9/9_outputs3.js'; 
import myArray94 from './datafile/data9/9_outputs4.js'; 
import myArray95 from './datafile/data9/9_outputs_allzero.js';
import myArray97 from './datafile/data9/A90.jpg';

import myArray100 from './datafile/data10/10_outputs0.js';
import myArray101 from './datafile/data10/10_outputs1.js'; 
import myArray102 from './datafile/data10/10_outputs2.js'; 
import myArray103 from './datafile/data10/10_outputs3.js'; 
import myArray104 from './datafile/data10/10_outputs4.js'; 
import myArray105 from './datafile/data10/10_outputs_allzero.js';
import myArray107 from './datafile/data10/A100.jpg';

import myArray110 from './datafile/data11/11_outputs0.js';
import myArray111 from './datafile/data11/11_outputs1.js'; 
import myArray112 from './datafile/data11/11_outputs2.js'; 
import myArray113 from './datafile/data11/11_outputs3.js'; 
import myArray114 from './datafile/data11/11_outputs4.js'; 
import myArray115 from './datafile/data11/11_outputs_allzero.js';
import myArray117 from './datafile/data11/A110.jpg';

import myArray120 from './datafile/data12/12_outputs0.js';
import myArray121 from './datafile/data12/12_outputs1.js'; 
import myArray122 from './datafile/data12/12_outputs2.js'; 
import myArray123 from './datafile/data12/12_outputs3.js'; 
import myArray124 from './datafile/data12/12_outputs4.js'; 
import myArray125 from './datafile/data12/12_outputs_allzero.js';
import myArray127 from './datafile/data12/A120.jpg';

import myArray130 from './datafile/data13/13_outputs0.js';
import myArray131 from './datafile/data13/13_outputs1.js'; 
import myArray132 from './datafile/data13/13_outputs2.js'; 
import myArray133 from './datafile/data13/13_outputs3.js'; 
import myArray134 from './datafile/data13/13_outputs4.js'; 
import myArray135 from './datafile/data13/13_outputs_allzero.js';
import myArray137 from './datafile/data13/A130.jpg';

import myArray140 from './datafile/data14/14_outputs0.js';
import myArray141 from './datafile/data14/14_outputs1.js'; 
import myArray142 from './datafile/data14/14_outputs2.js'; 
import myArray143 from './datafile/data14/14_outputs3.js'; 
import myArray144 from './datafile/data14/14_outputs4.js'; 
import myArray145 from './datafile/data14/14_outputs_allzero.js';
import myArray147 from './datafile/data14/A140.jpg';

import myArray150 from './datafile/data15/15_outputs0.js';
import myArray151 from './datafile/data15/15_outputs1.js'; 
import myArray152 from './datafile/data15/15_outputs2.js'; 
import myArray153 from './datafile/data15/15_outputs3.js'; 
import myArray154 from './datafile/data15/15_outputs4.js'; 
import myArray155 from './datafile/data15/15_outputs_allzero.js';
import myArray157 from './datafile/data15/A150.jpg';

import myArray160 from './datafile/data16/16_outputs0.js';
import myArray161 from './datafile/data16/16_outputs1.js'; 
import myArray162 from './datafile/data16/16_outputs2.js'; 
import myArray163 from './datafile/data16/16_outputs3.js'; 
import myArray164 from './datafile/data16/16_outputs4.js'; 
import myArray165 from './datafile/data16/16_outputs_allzero.js';
import myArray167 from './datafile/data16/A160.jpg';

import myArray170 from './datafile/data17/17_outputs0.js';
import myArray171 from './datafile/data17/17_outputs1.js'; 
import myArray172 from './datafile/data17/17_outputs2.js'; 
import myArray173 from './datafile/data17/17_outputs3.js'; 
import myArray174 from './datafile/data17/17_outputs4.js'; 
import myArray175 from './datafile/data17/17_outputs_allzero.js';
import myArray177 from './datafile/data17/A170.jpg';

import myArray180 from './datafile/data18/18_outputs0.js';
import myArray181 from './datafile/data18/18_outputs1.js'; 
import myArray182 from './datafile/data18/18_outputs2.js'; 
import myArray183 from './datafile/data18/18_outputs3.js'; 
import myArray184 from './datafile/data18/18_outputs4.js'; 
import myArray185 from './datafile/data18/18_outputs_allzero.js';
import myArray187 from './datafile/data18/A180.jpg';

import myArray190 from './datafile/data19/19_outputs0.js';
import myArray191 from './datafile/data19/19_outputs1.js'; 
import myArray192 from './datafile/data19/19_outputs2.js'; 
import myArray193 from './datafile/data19/19_outputs3.js'; 
import myArray194 from './datafile/data19/19_outputs4.js'; 
import myArray195 from './datafile/data19/19_outputs_allzero.js';
import myArray197 from './datafile/data19/A190.jpg';


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

  let combinedArrays = { myArray10, myArray20, myArray30, myArray40, myArray50, myArray60, myArray70, myArray80, myArray90,
    myArray100, myArray110, myArray120, myArray130, myArray140, myArray150, myArray160, myArray170, myArray180, myArray190};

  let combinedArrays1 = { myArray11, myArray21, myArray31, myArray41, myArray51, myArray61, myArray71, myArray81, myArray91,
    myArray101, myArray111, myArray121, myArray131, myArray141, myArray151, myArray161, myArray171, myArray181, myArray191};

  let combinedArrays2 = { myArray12, myArray22, myArray32, myArray42, myArray52, myArray62, myArray72, myArray82, myArray92,
    myArray102, myArray112, myArray122, myArray132, myArray142, myArray152, myArray162, myArray172, myArray182, myArray192};

  let combinedArrays3 = { myArray13, myArray23, myArray33, myArray43, myArray53, myArray63, myArray73, myArray83, myArray93,
    myArray103, myArray113, myArray123, myArray133, myArray143, myArray153, myArray163, myArray173, myArray183, myArray193};

  let combinedArrays4 = { myArray14, myArray24, myArray34, myArray44, myArray54, myArray64, myArray74, myArray84, myArray94,
    myArray104, myArray114, myArray124, myArray134, myArray144, myArray154, myArray164, myArray174, myArray184, myArray194};  

  let combinedArrays5 = { myArray15, myArray25, myArray35, myArray45, myArray55, myArray65, myArray75, myArray85, myArray95,
    myArray105, myArray115, myArray125, myArray135, myArray145, myArray155, myArray165, myArray175, myArray185, myArray195};

  let combinedArrays7 = { myArray17, myArray27, myArray37, myArray47, myArray57, myArray67, myArray77, myArray87, myArray97,
    myArray107, myArray117, myArray127, myArray137, myArray147, myArray157, myArray167, myArray177, myArray187, myArray197};
  

  // Generate random data
  const generateData = (n) => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);

    
    const data = [];
    for (let i = 0; i < combinedArrays['myArray'+ n + '0'].length; ++i) {
   
      
      let value = combinedArrays['myArray'+ n + '0'][i];
      let value1 = combinedArrays1['myArray'+ n +'1'][i];
      let value2 = combinedArrays2['myArray'+ n +'2'][i];
      let value3 = combinedArrays3['myArray'+ n +'3'][i];
      let value4 = combinedArrays4['myArray'+ n +'4'][i];
      let value5 = combinedArrays5['myArray'+ n +'5'][i]; //all_zero
     
      
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


    const series1 = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value1",
      valueXField: "date",
      stroke: am5.color(0x0000b3) //青
    }));

    series1.strokes.template.setAll({
      strokeWidth: 2
    });

    series1.data.setAll(data);


    const series2 = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value2",
      valueXField: "date",
      stroke: am5.color(0xFFFF00) //黄
    }));

    series2.strokes.template.setAll({
      strokeWidth: 2
    });

    series2.data.setAll(data);


    const series3 = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value3",
      valueXField: "date",
      stroke: am5.color(0xFFA500) //オレンジ
    }));

    series3.strokes.template.setAll({
      strokeWidth: 2
    });

    series3.data.setAll(data);


    const series4 = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value4",
      valueXField: "date",
      stroke: am5.color(0xFF0000) //赤
    }));

    series4.strokes.template.setAll({
      strokeWidth: 2
    });

    series4.data.setAll(data);


    const series5 = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value5",
      valueXField: "date",
      stroke: am5.color(0x000000) //黒
    }));

    series5.strokes.template.setAll({
      strokeWidth: 2
    });

    series5.data.setAll(data);
  }

  


  return (
    <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default StockCharts;
