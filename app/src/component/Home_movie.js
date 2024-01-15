import React, { useState, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarComponent from './Home_graph.js'; //グラフを呼び出す
import ReactPlayer from 'react-player';
import './Home.css'; //css(デザイン)
import * as colorModule from './color_file.js'; //グラフに使用するカラーの一覧
import {video_number} from './number_outputs.js'; //動画の数
import movieList from './MovieList'; //動画の順番一覧

const App = () => {
  const [videoDuration, setVideoDuration] = useState(0); //動画の長さを習得
  const playerRef = useRef(null); //動画を作成
  const [playbackRate, setPlaybackRate] = useState(1); //再生速度
  const [isPlaying, setIsPlaying] = useState(false); //ビデオの再生状態を制御(true:再生中)
  const [x_second, setX_second] = useState(0); //左のスクロールバーの秒数
  const [y_second, setY_second] = useState(0); //右のスクロールバーの秒数
  const [s_second, setS_second] = useState(0); //タイムラインバーの秒数
  const {ans} = useParams(); //何番目のデータを前ページから取得する

  let [randomIndex, setRandomIndex] = useState( //グラフの色を何番目から始めるかを乱数で決める
    Math.floor(Math.random() * colorModule.colors.length)
  ); 

  const navigate = useNavigate(); //リンクで飛ぶときに使用
  const goToLink = (path) => {//リンク先に飛んだ時に再ロードすることで、グラフを更新する
    navigate(path);
    window.location.reload(); //リロード
  };

  const dynamicModules = {}; //データファイルの配列
  const image = {}; //画像ファイルの配列
  const video = {}; //動画ファイルの配列

  for (let i = 1; i <= video_number; i++) { //動画の数だけループ

    dynamicModules[`dynamicModule${i}`] = require(`./${i}_outputs.js`); //データファイル読み込み
    image[`image${i}`] = require(`./image/${i}.jpg`); //画像ファイル読み込み
    video[`video${i}`] = require(`./movie/${movieList[i]}.mp4`); //動画ファイル読み込み
  }
  const myArrayList = [];

  for (let count = 1; count <= video_number; count++) {  //右上の動画一覧を作成するための単語リストを作成
    const values1 = Object.values(dynamicModules['dynamicModule' + count]); //データファイルを代入
    let myArray = values1[2]; //単語配列のみを取り出す
    const concatenatedString = myArray.join(', '); //コンマを使って単語ごとに区切る
    myArrayList.push(concatenatedString); //それを配列に代入してまとめる
  }

  const values1 = Object.values(dynamicModules['dynamicModule' + ans]); //右下の単語を表示するための処理
  let myArray7 = values1[2]; //単語配列のみを取り出す
  const roundedNumArray = []; //右下の単語の隣の数値を表示するための機能

  for (let i = 3; i < values1.length; i++) { //グラフの数だけループ
    const num = Math.floor(((values1[i].length - 1) * s_second / videoDuration) + 0.5);//タイムラインバーの座標を取得
    const convertedNum = parseFloat(values1[i][num]); //その座標の一致率(単語)を習得する
    const roundedNum = convertedNum.toFixed(3); //小数点第三位以降を切り捨て
    roundedNumArray.push(roundedNum); //データを代入
  }
  
  const handleDuration = (duration) => { //動画の長さを習得
    setVideoDuration(duration); //動画の長さを代入
  };

  //左のバーを動かしたとき
  const handleXDataChange = (newValue, long) => { //再生速度、動画の長さ
    setX_second(long * newValue / 729.28125) //x座標を習得
  };

  //右のバーを動かしたとき
  const handleYDataChange = (newValue, long) => { //再生速度、動画の長さ
    setY_second(long * newValue / 729.28125) //x座標を習得
  };

  //タイムラインバーを動かしたとき(手動)
  const handleSDataChange = (newValue, long) => { //再生速度、動画の長さ
    setS_second(long * newValue / 729.28125) //動画の秒数
    playerRef.current.seekTo(long * newValue / 729.28125, 'seconds');//バーと動画を対応させている
  }

  //タイムラインバーを動かしたとき(再生中)
  const handleEDataChange = (start, long) => { //再生速度、動画の長さ
    setS_second(long * start) //x座標を習得
  };

  //最初から再生、部分再生、一時停止(再開時)に使用する
  const handleZDataChange = (newValue, y, long) => { //再生速度、開始位置、動画の長さ
    setPlaybackRate(newValue); //再生速度を代入
    playerRef.current.seekTo(long * y / 729.28125 , 'seconds');//動画を再生
    setIsPlaying(true);// 自動再生を開始
  };

  //動画を停止させる  
  const onMovieStop = () => {
    setIsPlaying(false);// 自動再生を停止
  };  

  const getRandomColor = () => { //色の開始位置を乱数で決める
    let inf1 = colorModule.colors[randomIndex % colorModule.colors.length]; //RGBを別ファイルから呼び出す(乱数を要素数内の値になるように調整)
    randomIndex = randomIndex + 1; //連続した要素を使う

    const randomColor = `rgb(${inf1[0]}, ${inf1[1]}, ${inf1[2]})`; //取得したRGB値を文字列として組み立てる
    return randomColor;
  };
  
  const WordSquare = ({ color, word, value }) => (//正方形、単語に使用するcssを指定する
    <>
      <a className="color-square" style={{ backgroundColor: color }}></a> 
      <a className="white-title21">{word} : {value}</a>
    </>
  );
  
  const RenderWordSquares = () => { //正方形と単語を作成する
    const squares = myArray7.map((word, index) => ( //単語、カウント
      <>
        <WordSquare
          color={getRandomColor()} //乱数で決める
          word={word} //単語
          value={roundedNumArray[index]} //単語の隣の数値
        />
        {(index + 1) % 5 === 0 && <br />}
      </> //5要素ごとに改行を入れる
    ));
  
    return <>{squares}</>;
  };

  const generateLogoClickHandler = (ans) => { //ansは動画の番号
    return () => {
      goToLink(`/Home_movie/${ans}`); //異なる動画の画面に移動する
    };
  };

  const MovieLink = () => { //ホーム画面に移動する
    return () => {
      goToLink(`/`);
    };
  };

  return (
    <>
      <div className="title30">
        <ReactPlayer
          ref={playerRef}
          url={video['video' + ans]} //動画のurlを指定する
          playing={isPlaying} //trueの時動画が再生される
          controls={true} 
          width="780px" //動画の幅
          height="575px" //動画の高さ
          playsinline
          playbackRate={playbackRate} //動画の再生速度
          onDuration={handleDuration} //動画の長さを習得
  />
        <div className="scrollable-list"> 
          {Array.from({ length: video_number }, (_, index) => ( //右上の動画一覧を作成する
            <div key={index}>
              <a onClick={generateLogoClickHandler(index + 1)}> 
                <img src={image[`image${index + 1}`]} width={120} height={88} alt="Logo" />
              </a>
              <a onClick={generateLogoClickHandler(index + 1)} className="white-title22"> 
              {myArrayList[index]} 
              </a><br />
            </div>
          ))}
        </div>
      </div>
      <div className="title31">   
        <BarComponent
          randomIndex={randomIndex} //色の開始位置を乱数として送る(単語とグラフの色を対応させるため)
          onXDataChange={handleXDataChange} //左バーの秒数を習得
          onYDataChange={handleYDataChange} //右バーの秒数を習得
          onZDataChange={handleZDataChange} //動画を再生する
          onSDataChange={handleSDataChange} //タイムラインバーの秒数を習得(手動で動かすとき)
          onEDataChange={handleEDataChange} //タイムラインバーの秒数を習得(再生中)
          onMovieStop = {onMovieStop} //動画を止める
        />
      <div >
  
      <a className="title33">バー間秒数: {y_second ? 
            (y_second - x_second).toFixed(3) + ' 秒'  //右のバーを動かすまで座標を習得できないので、動画の長さを使用する
            : (videoDuration - x_second).toFixed(3) + ' 秒'}</a>

      <a className="title39" onClick={MovieLink()}>動画一覧へ</a><br></br> 
      <RenderWordSquares /> 
      
      </div></div>
    </>
  );
};
export default App;