import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarComponent from './Home_graph.js';


import ReactPlayer from 'react-player';
import './Home.css';
import {useCallback} from  'react'


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
 

import myArray16 from './movie/1.mp4';
import myArray26 from './movie/2.mp4';
import myArray36 from './movie/3.mp4';
import myArray46 from './movie/4.mp4';
import myArray56 from './movie/5.mp4';
import myArray66 from './movie/6.mp4';
import myArray76 from './movie/7.mp4';
import myArray86 from './movie/8.mp4';
import myArray96 from './movie/9.mp4';
import myArray106 from './movie/10.mp4';
import myArray116 from './movie/11.mp4'; 
import myArray126 from './movie/12.mp4';
import myArray136 from './movie/13.mp4';
import myArray146 from './movie/14.mp4';
import myArray156 from './movie/15.mp4';
import myArray166 from './movie/16.mp4';
import myArray176 from './movie/17.mp4';
import myArray186 from './movie/18.mp4';
import myArray196 from './movie/19.mp4';


import myArray18 from './image/1.jpg';
import myArray28 from './image/2.jpg';
import myArray38 from './image/3.jpg'
import myArray48 from './image/4.jpg';
import myArray58 from './image/5.jpg';
import myArray68 from './image/6.jpg';
import myArray78 from './image/7.jpg';
import myArray88 from './image/8.jpg';
import myArray98 from './image/9.jpg';
import myArray108 from './image/10.jpg';
import myArray118 from './image/11.jpg';
import myArray128 from './image/12.jpg';
import myArray138 from './image/13.jpg';
import myArray148 from './image/14.jpg'; 
import myArray158 from './image/15.jpg';
import myArray168 from './image/16.jpg';
import myArray178 from './image/17.jpg';
import myArray188 from './image/18.jpg'; 
import myArray198 from './image/19.jpg';



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

  const navigate = useNavigate();

  const goToLink = (path) => {//リンク先で再ロードし、グラフを更新する
    navigate(path);
    window.location.reload();
  };

  let combinedArrays = { dynamicModule1, dynamicModule2, dynamicModule3, dynamicModule4, dynamicModule5, dynamicModule6, 
    dynamicModule7, dynamicModule8, dynamicModule9, dynamicModule10, dynamicModule11, dynamicModule12, dynamicModule13, 
    dynamicModule14, dynamicModule15, dynamicModule16, dynamicModule17, dynamicModule18, dynamicModule19};
  
  let combinedArrays6 = { myArray16, myArray26, myArray36, myArray46, myArray56, myArray66, myArray76, myArray86, myArray96,
    myArray106, myArray116, myArray126, myArray136, myArray146, myArray156, myArray166, myArray176, myArray186, myArray196}; 
      
  const values1 = Object.values(combinedArrays['dynamicModule' + ans]);
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

  const logoClick1 = useCallback((e) => {goToLink("/Home_movie/1")});
  const logoClick2 = useCallback((e) => {goToLink("/Home_movie/2")});
  const logoClick3 = useCallback((e) => {goToLink("/Home_movie/3")});
  const logoClick4 = useCallback((e) => {goToLink("/Home_movie/4")});
  const logoClick5 = useCallback((e) => {goToLink("/Home_movie/5")});
  const logoClick6 = useCallback((e) => {goToLink("/Home_movie/6")});
  const logoClick7 = useCallback((e) => {goToLink("/Home_movie/7")});
  const logoClick8 = useCallback((e) => {goToLink("/Home_movie/8")});
  const logoClick9 = useCallback((e) => {goToLink("/Home_movie/9")});
  const logoClick10 = useCallback((e) => {goToLink("/Home_movie/10")});
  const logoClick11 = useCallback((e) => {goToLink("/Home_movie/11")});
  const logoClick12 = useCallback((e) => {goToLink("/Home_movie/12")});
  const logoClick13 = useCallback((e) => {goToLink("/Home_movie/13")});
  const logoClick14 = useCallback((e) => {goToLink("/Home_movie/14")});
  const logoClick15 = useCallback((e) => {goToLink("/Home_movie/15")});
  const logoClick16 = useCallback((e) => {goToLink("/Home_movie/16")});
  const logoClick17 = useCallback((e) => {goToLink("/Home_movie/17")});
  const logoClick18 = useCallback((e) => {goToLink("/Home_movie/18")});
  const logoClick19 = useCallback((e) => {goToLink("/Home_movie/19")});

  if(animation){ //一回のみ実行
    setAnimation(false);
    
    for (let i = 5; i < values1[2].length; i++) { //単語の長さで判断
      const colorClasses = ["green-square", "blue-square", "yellow-square", "orange-square", "red-square"];
    
      const output = document.createElement("a"); 
      output.innerHTML = `
        <a class="${colorClasses[i%5]}"></a>
        <a class="white-title21">${values1[2][i]}</a>
      `;
  
      document.body.appendChild(output);
    }
  }

  //getColorSquareClass(10)
 
  
  return (
    <>

      <div className="title30">
        <ReactPlayer
          ref={playerRef}
          url={combinedArrays6['myArray'+ ans +'6']}
          playing={isPlaying} // isPlayingを使用してビデオの再生を制御
          controls={true}
          width="780px"
          height="575px"
          playsinline
          playbackRate={playbackRate}
          onDuration={handleDuration}
  />

         <div className="scrollable-list">

         <a onClick= {logoClick1} ><img src={myArray18}  width={120} height={88} alt="Logo" /></a>
         <a  onClick= {logoClick1} className="white-title22">『私』『父』『車』『買う』『しました』</a> <br></br>

         <a onClick= {logoClick2} ><img src={myArray28}  width={120} height={88} alt="Logo" /></a>
         <a onClick= {logoClick2} className="white-title22">『私』『あなた』『好き』</a><br></br>

        <a onClick= {logoClick3} ><img src={myArray38}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick3} className="white-title22">『私』『兄』『仕事』『行く』</a> <br></br>

        <a onClick= {logoClick4} ><img src={myArray48}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick4} className="white-title22">『父』『映画』『見る』『好き』</a><br></br>

        <a onClick= {logoClick5} ><img src={myArray58}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick5} className="white-title22">『弟』『海』『遊ぶ』『行く』</a><br></br>

        <a onClick= {logoClick6} ><img src={myArray68}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick6} className="white-title22">『兄』『趣味』『サッカー』</a><br></br>

        <a onClick= {logoClick7} ><img src={myArray78}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick7} className="white-title22">『母』『仕事』『行く』</a><br></br>

        <a onClick= {logoClick8} ><img src={myArray88}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick8} className="white-title22">『私』『山』『行く』</a><br></br>

        <a onClick= {logoClick9} ><img src={myArray98}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick9} className="white-title22">『あなた』『サッカー』『見る』</a><br></br>

        <a onClick= {logoClick10} ><img src={myArray108}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick10} className="white-title22">『あなた』『山』『遊ぶ』『しました』</a><br></br>

        <a onClick= {logoClick11} ><img src={myArray118}  width={120} height={88} alt="Logo" /></a>
         <a onClick= {logoClick11} className="white-title22">『私』『兄』『車』『買う』『しました』</a> <br></br>

         <a onClick= {logoClick12} ><img src={myArray128}  width={120} height={88} alt="Logo" /></a>
         <a onClick= {logoClick12} className="white-title22">『私』『兄』『好き』</a><br></br>

        <a onClick= {logoClick13} ><img src={myArray138}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick13} className="white-title22">『私』『父』『仕事』『行く』</a> <br></br>

        <a onClick= {logoClick14} ><img src={myArray148}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick14} className="white-title22">『母』『山』『遊ぶ』『行く』</a><br></br>

        <a onClick= {logoClick15} ><img src={myArray158}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick15} className="white-title22">『父』『趣味』『サッカー』</a><br></br>

        <a onClick= {logoClick16} ><img src={myArray168}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick16} className="white-title22">『兄』『仕事』『行く』</a><br></br>

        <a onClick= {logoClick17} ><img src={myArray178}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick17} className="white-title22">『父』『海』『行く』『しました』</a><br></br>

        <a onClick= {logoClick18} ><img src={myArray188}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick18} className="white-title22">『弟』『サッカー』『見る』</a><br></br>

        <a onClick= {logoClick19} ><img src={myArray198}  width={120} height={88} alt="Logo" /></a>
        <a onClick= {logoClick19} className="white-title22">『私』『山』『遊ぶ』『しました』</a><br></br>

      </div> 
      </div>

      <div className="title31">

     
      <BarComponent
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

      <a className="green-square"></a><a className="white-title21">{myArray7[0]} : {roundedNumArray[0]}</a>
      <a className="blue-square"></a><a className="white-title21">{myArray7[1]} : {roundedNumArray[1]}</a><br></br>
      <a className="yellow-square"></a><a className="white-title21">{myArray7[2]} : {roundedNumArray[2]}</a>
      <a className="orange-square"></a><a className="white-title21">{myArray7[3]} : {roundedNumArray[3]}</a><br></br>
      <a className="red-square"></a><a className="white-title21">{myArray7[4]} : {roundedNumArray[4]}</a>
     
      </div> 

      </div>
    </>
  );
};

export default App;