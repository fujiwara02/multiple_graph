import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Micro from '@amcharts/amcharts5/themes/Micro';

const StockCharts = () => {

  useEffect(() => {
    const tickers = [ //要素の名前
      "AAPL", "ADBE", "ADSK", "AMD", "AMZN"];
      //, "ATVI", "CRM", "CSCO", "COIN", "DELL",
      //"DOCU", "EA", "EBAY", "FB", "GOOG", "HOOD", "IBM", "INTC", "MSFT", "NET",
      //"NFLX", "NVDA", "ORCL", "PLTR", "PYPL", "ROKU", "SAP", "SHOP", "SNAP",
      //"SONY", "STX", "T", "TSLA", "TSM", "TWTR", "U", "UBER", "VMW", "WDC", "ZM"
    

    tickers.forEach(ticker => {
      const positive = am5.color(0x50b300); //赤
      const negative = am5.color(0xb30000); //緑
      const data = generateData(20); //20個の点
      const change = Math.round((data[data.length - 1].value / data[0].value - 1) * 1000) / 10; //最初と最後の変化の割合
      const color = change < 0 ? negative : positive; //正か負か

      const chartContainer = document.createElement('div');//行の要素
      chartContainer.style.width = '100%'; //各要素の横幅
      chartContainer.style.height = '50px'; //各要素の縦幅
      
      document.getElementById('chartdiv').appendChild(chartContainer); //chartに描画
      renderChartRow(ticker, change, color, chartContainer, data); //要素を指定

    });

  }, []);

  // Generate random data
  const generateData = (count) => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = Math.round(Math.random() * 100);
    let volume = Math.round(Math.random() * 10000);

    const data = [];
    for (let i = 0; i < count; ++i) {
      value = Math.round((Math.random() * 6 - 3) + value);
      volume = Math.round((Math.random() * 1000 - 500) + volume);
      if (volume < 0) {        volume = 0;
      }
      am5.time.add(date, "day", 1);
      data.push({
        date: date.getTime(),
        value: value,
        volume: volume
      });
    }
    return data;
  }

  const renderChartRow = (ticker, change, color, container, data) => {
    const row = document.createElement("div"); //1行のコンテナ
    row.style.borderBottom = "1px solid #eee"; //1pxのボーダーを作成
    row.style.clear = "left"; //改行
    container.appendChild(row); //親要素にこの行を追加

    const col1 = document.createElement("div");
    col1.innerHTML = ticker;
    col1.style.fontSize = "2em";
    col1.style.width = "10%";
    col1.style.padding = "0.2em 0.4em";
    col1.style.float = "left";
    row.appendChild(col1); //タイトル

    const col2 = document.createElement("div");
    col2.innerHTML = change + "%";
    col2.style.fontSize = "2em";
    col2.style.width = "10%";
    col2.style.padding = "0.2em 0.4em";
    col2.style.float = "left";
    col2.style.color = color.toCSSHex();
    col2.style.textAlign = "center";
    row.appendChild(col2); //パーセンテージ

    const col3 = document.createElement("div");
    col3.style.fontSize = "2em";
    col3.style.width = "33%";
    col3.style.height = "35px";
    col3.style.padding = "0.2em 0.4em";
    col3.style.float = "left";
    row.appendChild(col3);
    createValueChart(col3, data, color); //赤と緑のグラフ

    const col4 = document.createElement("div");
    col4.style.fontSize = "2em";
    col4.style.width = "33%";
    col4.style.height = "35px";
    col4.style.padding = "0.2em 0.4em";
    col4.style.float = "left";
    row.appendChild(col4);
    createVolumeChart(col4, data); //灰色のグラフ

  }

  const createValueChart = (container, data, color) => {
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
      stroke: color
    }));

    series.strokes.template.setAll({
      strokeWidth: 2
    });

    series.data.setAll(data);
  }

  const createVolumeChart = (container, data) => {
    const root = am5.Root.new(container); //グラフを描画するキャンバス

    root.setThemes([ //チャートの外見やスタイル
      am5themes_Micro.new(root)
    ]);

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,       // X軸方向のドラッグを無効に
      panY: false,       // Y軸方向のドラッグを無効に
      wheelX: "none",    // マウスホイールによる拡大縮小を無効に
      wheelY: "none",    // マウスホイールによる拡大縮小を無効に
      pinchZoomX: false , // ピンチジェスチャーによる拡大縮小を無効に
    }));

    chart.plotContainer.set("wheelable", false); //スクロールを無効
    chart.zoomOutButton.set("forceHidden", true); //ズームボタンを非表示

    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: { timeUnit: "day", count: 1 },//日付軸、一日単位
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "volume",
      valueXField: "date",
      fill: am5.color(0x999999) //灰色
    }));

    series.data.setAll(data); //実際のデータをセット
  
  }

  return (
    <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default StockCharts;
