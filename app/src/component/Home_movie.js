import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarComponent from './Home_graph.js';

import ReactPlayer from 'react-player';
import './Home.css';
import * as colorModule from './color_file.js';
import * as importFiles from './import.js';




const App = () => {
 
  const [videoDuration, setVideoDuration] = useState(0);
  const playerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false); // ビデオの再生状態を制御
  const [x_second, setX_second] = useState(0);
  const [y_second, setY_second] = useState(0);
  const [s_second, setS_second] = useState(0);
  const {ans} = useParams();
  const [animation, setAnimation] = useState(true); 
  let [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * colorModule.colors.length)
  );

  const navigate = useNavigate();

  const goToLink = (path) => {//リンク先で再ロードし、グラフを更新する
    navigate(path);
    window.location.reload();
  };

  const dynamicModules = {};

for (let i = 1; i <= 19; i++) {
  dynamicModules[`dynamicModule${i}`] = require(`./${i}_outputs.js`);
}

// Now you can access the modules using dynamicModules.dynamicModule1, dynamicModules.dynamicModule2, etc.




  const myArrayList = [];

  for (let ans = 1; ans <= 19; ans++) {
    const values1 = Object.values(dynamicModules['dynamicModule' + ans]);
    let myArray = values1[2];
    myArrayList.push(myArray);
  }

  const values1 = Object.values(dynamicModules['dynamicModule' + ans]);
  let myArray7 = values1[2]; //単語

  const roundedNumArray = [];

  for (let i = 3; i < values1.length; i++) {

    const num = Math.floor(((values1[i].length - 1) * s_second / videoDuration) + 0.5);
    const convertedNum = parseFloat(values1[i][num]);
    const roundedNum = convertedNum.toFixed(3);

    roundedNumArray.push(roundedNum);
  }
  
  const handleDuration = (duration) => { //動画の長さを習得
    setVideoDuration(duration);
  };

  const handleXDataChange = (newValue, long) => { //左のバーを動かしたとき
    setX_second(long * newValue / 729.28125) //x座標を習得
  };

  const handleYDataChange = (newValue, long) => { //右のバーを動かしたとき
    setY_second(long * newValue / 729.28125) //y座標を習得
  };

  //動画再生
  const handleZDataChange = (newValue, y, long) => { //再生速度、開始位置、動画の長さ
    setPlaybackRate(newValue);
    playerRef.current.seekTo(long * y / 729.28125 , 'seconds');//動画を再生
    setIsPlaying(true);// 自動再生を開始
  };

  //真ん中のバー
  const handleSDataChange = (newValue, long) => { 
    setS_second(long * newValue / 729.28125)
    playerRef.current.seekTo(long * newValue / 729.28125, 'seconds');//バーと動画を対応させている
  }

  //動画を停止させる  
  const onMovieStop = () => {
    setIsPlaying(false);// 自動再生を停止
  };  

  const getRandomColor = () => {
    let inf1 = colorModule.colors[randomIndex % colorModule.colors.length];
    randomIndex = randomIndex + 1;

    const randomColor = `rgb(${inf1[0]}, ${inf1[1]}, ${inf1[2]})`;
    return randomColor;
  };
  
  const WordSquare = ({ color, word, value }) => (
    <>
      <a className="color-square" style={{ backgroundColor: color }}></a>
      <a className="white-title21">{word} : {value}</a>
    </>
  );
  
  const RenderWordSquares = () => {
    const squares = myArray7.map((word, index) => (
      <>
        <WordSquare
          color={getRandomColor()} // Pass a random color
          word={word}
          value={roundedNumArray[index]}
        />
        {(index + 1) % 5 === 0 && <br />} {/* Line break every 5 squares */}
      </>
    ));
  
    return <>{squares}</>;
  };

  const data = [
    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
  
  // Specify the number of items to display
  const numberOfItemsToShow = 17;

  const generateLogoClickHandler = (ans) => {
    return () => {
      goToLink(`/Home_movie/${ans}`);
    };
  };
 
  
  return (
    <>

      <div className="title30">
        <ReactPlayer
          ref={playerRef}
          url={importFiles['myArray' + ans + '6']}
          playing={isPlaying} // isPlayingを使用してビデオの再生を制御
          controls={true}
          width="780px"
          height="575px"
          playsinline
          playbackRate={playbackRate}
          onDuration={handleDuration}
  />

         <div className="scrollable-list">

         {data.slice(0, numberOfItemsToShow).map((item,index) => (
        <div key={index}>
          <a onClick={generateLogoClickHandler(index + 1)}>
            <img src={importFiles['myArray'+ (index + 1) +'8']} width={120} height={88} alt="Logo" />
          </a>
          <a onClick={generateLogoClickHandler(index + 1)} className="white-title22">
            {myArrayList[index]}
          </a>
          <br />
        </div>
      ))}

      </div> 
      </div>

      <div className="title31">

     
      <BarComponent
        randomIndex={randomIndex}
        onXDataChange={handleXDataChange} //左バーの秒数を習得
        onYDataChange={handleYDataChange} //右バーの秒数を習得
        onZDataChange={handleZDataChange}
        onSDataChange={handleSDataChange}
        onMovieStop = {onMovieStop} //動画を止める
      />

      <div >
  
      <a className="title33">バー間秒数: {y_second ? 
            (y_second - x_second).toFixed(3) + ' 秒' 
            : (videoDuration - x_second).toFixed(3) + ' 秒'}</a><br></br>

<RenderWordSquares />
      </div> 

      </div>
    </>
  );
};

export default App;