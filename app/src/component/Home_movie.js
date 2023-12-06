import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarComponent from './Home_graph.js';


import ReactPlayer from 'react-player';
import Sam from './D13(1).mp4';
import './Home.css';
import {useCallback} from  'react'
import targets_word from './targets_word.js';

import image from '../images/image.jpg'

import myArray10 from './datafile/data1/1_outputs0.js';
import myArray11 from './datafile/data1/1_outputs1.js'; 
import myArray12 from './datafile/data1/1_outputs2.js'; 
import myArray13 from './datafile/data1/1_outputs3.js'; 
import myArray14 from './datafile/data1/1_outputs4.js'; 
import myArray15 from './datafile/data1/1_targets_word'; 
import myArray16 from './datafile/data1/A11.mp4';
import myArray17 from './datafile/data1/A10.jpg';

import myArray20 from './datafile/data2/2_outputs0.js';
import myArray21 from './datafile/data2/2_outputs1.js'; 
import myArray22 from './datafile/data2/2_outputs2.js'; 
import myArray23 from './datafile/data2/2_outputs3.js'; 
import myArray24 from './datafile/data2/2_outputs4.js'; 
import myArray25 from './datafile/data2/2_targets_word'; 
import myArray26 from './datafile/data2/A21.mp4';
import myArray27 from './datafile/data2/A20.jpg';

import myArray30 from './datafile/data3/3_outputs0.js';
import myArray31 from './datafile/data3/3_outputs1.js'; 
import myArray32 from './datafile/data3/3_outputs2.js'; 
import myArray33 from './datafile/data3/3_outputs3.js'; 
import myArray34 from './datafile/data3/3_outputs4.js'; 
import myArray35 from './datafile/data3/3_targets_word'; 
import myArray36 from './datafile/data3/A31.mp4';
import myArray37 from './datafile/data3/A30.jpg';

import myArray40 from './datafile/data4/4_outputs0.js';
import myArray41 from './datafile/data4/4_outputs1.js'; 
import myArray42 from './datafile/data4/4_outputs2.js'; 
import myArray43 from './datafile/data4/4_outputs3.js'; 
import myArray44 from './datafile/data4/4_outputs4.js'; 
import myArray45 from './datafile/data4/4_targets_word'; 
import myArray46 from './datafile/data4/A41.mp4';
import myArray47 from './datafile/data4/A40.jpg';

import myArray50 from './datafile/data5/5_outputs0.js';
import myArray51 from './datafile/data5/5_outputs1.js'; 
import myArray52 from './datafile/data5/5_outputs2.js'; 
import myArray53 from './datafile/data5/5_outputs3.js'; 
import myArray54 from './datafile/data5/5_outputs4.js'; 
import myArray55 from './datafile/data5/5_targets_word'; 
import myArray56 from './datafile/data5/A51.mp4';
import myArray57 from './datafile/data5/A50.jpg';

import myArray60 from './datafile/data6/6_outputs0.js';
import myArray61 from './datafile/data6/6_outputs1.js'; 
import myArray62 from './datafile/data6/6_outputs2.js'; 
import myArray63 from './datafile/data6/6_outputs3.js'; 
import myArray64 from './datafile/data6/6_outputs4.js'; 
import myArray65 from './datafile/data6/6_targets_word'; 
import myArray66 from './datafile/data6/A61.mp4';
import myArray67 from './datafile/data6/A60.jpg';

import myArray70 from './datafile/data7/7_outputs0.js';
import myArray71 from './datafile/data7/7_outputs1.js'; 
import myArray72 from './datafile/data7/7_outputs2.js'; 
import myArray73 from './datafile/data7/7_outputs3.js'; 
import myArray74 from './datafile/data7/7_outputs4.js';
import myArray75 from './datafile/data7/7_targets_word';  
import myArray76 from './datafile/data7/A71.mp4';
import myArray77 from './datafile/data7/A70.jpg';

import myArray80 from './datafile/data8/8_outputs0.js';
import myArray81 from './datafile/data8/8_outputs1.js'; 
import myArray82 from './datafile/data8/8_outputs2.js'; 
import myArray83 from './datafile/data8/8_outputs3.js'; 
import myArray84 from './datafile/data8/8_outputs4.js'; 
import myArray85 from './datafile/data8/8_targets_word'; 
import myArray86 from './datafile/data8/A81.mp4';
import myArray87 from './datafile/data8/A80.jpg';

import myArray90 from './datafile/data9/9_outputs0.js';
import myArray91 from './datafile/data9/9_outputs1.js'; 
import myArray92 from './datafile/data9/9_outputs2.js'; 
import myArray93 from './datafile/data9/9_outputs3.js'; 
import myArray94 from './datafile/data9/9_outputs4.js'; 
import myArray95 from './datafile/data9/9_targets_word'; 
import myArray96 from './datafile/data9/A91.mp4';
import myArray97 from './datafile/data9/A90.jpg';

import myArray100 from './datafile/data10/10_outputs0.js';
import myArray101 from './datafile/data10/10_outputs1.js'; 
import myArray102 from './datafile/data10/10_outputs2.js'; 
import myArray103 from './datafile/data10/10_outputs3.js'; 
import myArray104 from './datafile/data10/10_outputs4.js'; 
import myArray105 from './datafile/data10/10_targets_word'; 
import myArray106 from './datafile/data10/A101.mp4';
import myArray107 from './datafile/data10/A100.jpg';

import myArray110 from './datafile/data11/11_outputs0.js';
import myArray111 from './datafile/data11/11_outputs1.js'; 
import myArray112 from './datafile/data11/11_outputs2.js'; 
import myArray113 from './datafile/data11/11_outputs3.js'; 
import myArray114 from './datafile/data11/11_outputs4.js'; 
import myArray115 from './datafile/data11/11_targets_word';
import myArray116 from './datafile/data11/A111.mp4'; 
import myArray117 from './datafile/data11/A110.jpg';

import myArray120 from './datafile/data12/12_outputs0.js';
import myArray121 from './datafile/data12/12_outputs1.js'; 
import myArray122 from './datafile/data12/12_outputs2.js'; 
import myArray123 from './datafile/data12/12_outputs3.js'; 
import myArray124 from './datafile/data12/12_outputs4.js'; 
import myArray125 from './datafile/data12/12_targets_word'; 
import myArray126 from './datafile/data12/A121.mp4';
import myArray127 from './datafile/data12/A120.jpg';

import myArray130 from './datafile/data13/13_outputs0.js';
import myArray131 from './datafile/data13/13_outputs1.js'; 
import myArray132 from './datafile/data13/13_outputs2.js'; 
import myArray133 from './datafile/data13/13_outputs3.js'; 
import myArray134 from './datafile/data13/13_outputs4.js'; 
import myArray135 from './datafile/data13/13_targets_word'; 
import myArray136 from './datafile/data13/A131.mp4';
import myArray137 from './datafile/data13/A130.jpg';

import myArray140 from './datafile/data14/14_outputs0.js';
import myArray141 from './datafile/data14/14_outputs1.js'; 
import myArray142 from './datafile/data14/14_outputs2.js'; 
import myArray143 from './datafile/data14/14_outputs3.js'; 
import myArray144 from './datafile/data14/14_outputs4.js'; 
import myArray145 from './datafile/data14/14_targets_word'; 
import myArray146 from './datafile/data14/A141.mp4';
import myArray147 from './datafile/data14/A140.jpg';

import myArray150 from './datafile/data15/15_outputs0.js';
import myArray151 from './datafile/data15/15_outputs1.js'; 
import myArray152 from './datafile/data15/15_outputs2.js'; 
import myArray153 from './datafile/data15/15_outputs3.js'; 
import myArray154 from './datafile/data15/15_outputs4.js'; 
import myArray155 from './datafile/data15/15_targets_word'; 
import myArray156 from './datafile/data15/A151.mp4';
import myArray157 from './datafile/data15/A150.jpg';

import myArray160 from './datafile/data16/16_outputs0.js';
import myArray161 from './datafile/data16/16_outputs1.js'; 
import myArray162 from './datafile/data16/16_outputs2.js'; 
import myArray163 from './datafile/data16/16_outputs3.js'; 
import myArray164 from './datafile/data16/16_outputs4.js'; 
import myArray165 from './datafile/data16/16_targets_word'; 
import myArray166 from './datafile/data16/A161.mp4';
import myArray167 from './datafile/data16/A160.jpg';

import myArray170 from './datafile/data17/17_outputs0.js';
import myArray171 from './datafile/data17/17_outputs1.js'; 
import myArray172 from './datafile/data17/17_outputs2.js'; 
import myArray173 from './datafile/data17/17_outputs3.js'; 
import myArray174 from './datafile/data17/17_outputs4.js'; 
import myArray175 from './datafile/data17/17_targets_word'; 
import myArray176 from './datafile/data17/A171.mp4';
import myArray177 from './datafile/data17/A170.jpg';

import myArray180 from './datafile/data18/18_outputs0.js';
import myArray181 from './datafile/data18/18_outputs1.js'; 
import myArray182 from './datafile/data18/18_outputs2.js'; 
import myArray183 from './datafile/data18/18_outputs3.js'; 
import myArray184 from './datafile/data18/18_outputs4.js'; 
import myArray185 from './datafile/data18/18_targets_word'; 
import myArray186 from './datafile/data18/A181.mp4';
import myArray187 from './datafile/data18/A180.jpg';

import myArray190 from './datafile/data19/19_outputs0.js';
import myArray191 from './datafile/data19/19_outputs1.js'; 
import myArray192 from './datafile/data19/19_outputs2.js'; 
import myArray193 from './datafile/data19/19_outputs3.js'; 
import myArray194 from './datafile/data19/19_outputs4.js'; 
import myArray195 from './datafile/data19/19_targets_word'; 
import myArray196 from './datafile/data19/A191.mp4';
import myArray197 from './datafile/data19/A190.jpg';



const App = () => {
 
  const [videoDuration, setVideoDuration] = useState(0);
  const [playground, setPlayground] = useState(Sam);
  const playerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false); // ビデオの再生状態を制御
  const [stopTime, setStopTime] = useState(0);
  const [x_second, setX_second] = useState(0);
  const [y_second, setY_second] = useState(0);
  const [s_second, setS_second] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const {ans} = useParams();

  const navigate = useNavigate();

  const goToLink = (path) => {//リンク先で再ロードし、グラフを更新する
    navigate(path);
    window.location.reload();
  };

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

  let combinedArrays6 = { myArray16, myArray26, myArray36, myArray46, myArray56, myArray66, myArray76, myArray86, myArray96,
    myArray106, myArray116, myArray126, myArray136, myArray146, myArray156, myArray166, myArray176, myArray186, myArray196}; 
      
  let myArray0 = combinedArrays['myArray'+ ans + '0'];
  let myArray1 = combinedArrays1['myArray'+ ans +'1'];
  let myArray2 = combinedArrays2['myArray'+ ans +'2'];
  let myArray3 = combinedArrays3['myArray'+ ans +'3'];
  let myArray4 = combinedArrays4['myArray'+ ans +'4'];
  let myArray5 = combinedArrays5['myArray'+ ans +'5'];

  const num = Math.floor(((myArray0.length-1) *  s_second / videoDuration) + 0.5);//切り捨てなので、0.5加える
  const convertedNum = parseFloat(myArray0[num]); // 指数表記の数値を通常の数値に変換
  const roundedNum = convertedNum.toFixed(3); // 3桁で四捨五入

  const num1 = Math.floor(((myArray1.length-1) *  s_second / videoDuration) + 0.5);
  const convertedNum1 = parseFloat(myArray1[num1]); // 指数表記の数値を通常の数値に変換
  const roundedNum1 = convertedNum1.toFixed(3); // 3桁で四捨五入

  const num2 = Math.floor(((myArray2.length-1) *  s_second / videoDuration) + 0.5);
  const convertedNum2 = parseFloat(myArray2[num2]); // 指数表記の数値を通常の数値に変換
  const roundedNum2 = convertedNum2.toFixed(3); // 3桁で四捨五入

  const num3 = Math.floor(((myArray3.length-1) *  s_second / videoDuration) + 0.5);
  const convertedNum3 = parseFloat(myArray3[num3]); // 指数表記の数値を通常の数値に変換
  const roundedNum3 = convertedNum3.toFixed(3); // 3桁で四捨五入

  const num4 = Math.floor(((myArray4.length-1) *  s_second / videoDuration) + 0.5);
  const convertedNum4 = parseFloat(myArray4[num4]); // 指数表記の数値を通常の数値に変換
  const roundedNum4 = convertedNum4.toFixed(3); // 3桁で四捨五入


  

  //const roundedNumber = myArray0[num].toFixed(0);
  const handleDuration = (duration) => {
    // durationが動画の総時間（秒単位）です
    setVideoDuration(duration);
  };


  const handleXDataChange = (newValue, long) => { //左のバー
    setX_second(long * newValue / 729.28125)
    
  };

  const handleYDataChange = (newValue, long) => { //右のバー
    setY_second(long * newValue / 729.28125)
    console.log(long * newValue / 729.28125);

  };

  const handleSDataChange = (newValue, long) => { //真ん中のバー
    setS_second(long * newValue / 729.28125)
    playerRef.current.seekTo(long * newValue / 729.28125, 'seconds');//バーと動画を対応させている

  }

  const handleCDataChange = (newValue, long) => {//最初から再生  

    setPlaybackRate(newValue);
    const randomNumber = Math.random();// 0以上1未満の乱数を生成(useEffect)
    playerRef.current.seekTo(0, 'seconds');//最初から再生
    //setStopTime(long + randomNumber/10000);//8.022秒後に自動再生をfalseに
    setIsPlaying(true);// 自動再生を開始
    //setPlaybackRate(1);

  };

  const handleZDataChange = (newValue, y, z, long) => {//最初から再生  

    setPlaybackRate(newValue);
    const randomNumber = Math.random();// 0以上1未満の乱数を生成(useEffect)
    
    playerRef.current.seekTo(long * y / 729.28125 , 'seconds');//開始地点
    //setStopTime((long * (z - y) / 729.28125) + (randomNumber / 10000));//何秒後に自動再生をfalseに
    setIsPlaying(true);// 自動再生を開始
    //setPlaybackRate(1);
    //console.log(y);
    //console.log(z);

  };

  const onMovieStop = () => {//動画を停止させる  
    setIsPlaying(false);// 自動再生を開始
    //console.log(isPlaying);

  };

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
  };



  

  const logoClick1 = useCallback((e) => {
    goToLink("/Home_movie/1")
  });

  const logoClick2 = useCallback((e) => {
    goToLink("/Home_movie/2")
  });

  const logoClick3 = useCallback((e) => {
    goToLink("/Home_movie/3")
  });

  const logoClick4 = useCallback((e) => {
    goToLink("/Home_movie/4")
  });

  const logoClick5 = useCallback((e) => {
    goToLink("/Home_movie/5")
  });

  const logoClick6 = useCallback((e) => {
    goToLink("/Home_movie/6")
  });

  const logoClick7 = useCallback((e) => {
    goToLink("/Home_movie/7")
  });

  const logoClick8 = useCallback((e) => {
    goToLink("/Home_movie/8")
  });

  const logoClick9 = useCallback((e) => {
    goToLink("/Home_movie/9")
  });

  const logoClick10 = useCallback((e) => {
    goToLink("/Home_movie/10")
  });

  const logoClick11 = useCallback((e) => {
    goToLink("/Home_movie/11")
  });

  const logoClick12 = useCallback((e) => {
    goToLink("/Home_movie/12")
  });

  const logoClick13 = useCallback((e) => {
    goToLink("/Home_movie/13")
  });

  const logoClick14 = useCallback((e) => {
    goToLink("/Home_movie/14")
  });

  const logoClick15 = useCallback((e) => {
    goToLink("/Home_movie/15")
  });

  const logoClick16 = useCallback((e) => {
    goToLink("/Home_movie/16")
  });

  const logoClick17 = useCallback((e) => {
    goToLink("/Home_movie/17")
  });

  const logoClick18 = useCallback((e) => {
    goToLink("/Home_movie/18")
  });

  const logoClick19 = useCallback((e) => {
    goToLink("/Home_movie/19")
  });
  


  useEffect(() => {//stopTimeが変化したときに呼び出される
    // X秒後に動画を停止
    if (stopTime !== null) {
      const timer = setTimeout(() => {//X秒後に実行するタイマーを設定
        
        setIsPlaying(false);
        //playerRef.current.pause();
        
      }, stopTime * 1000 / playbackRate); // 秒をミリ秒に変換

      return () => clearTimeout(timer);
    }
  }, [stopTime]);
 
  

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
          onProgress={handleProgress} // 現在の秒数
  />

  
        
         <div className="scrollable-list">

         <a onClick= {logoClick1} >
            <img src={myArray17}  width={120} height={88} alt="Logo" />
         </a>
         <a  onClick= {logoClick1} className="white-title22">『私』『父』『車』『買う』『しました』</a> <br></br>

         <a onClick= {logoClick2} >
            <img src={myArray27}  width={120} height={88} alt="Logo" />
         </a>
         <a onClick= {logoClick2} className="white-title22">『私』『あなた』『好き』</a><br></br>

        <a onClick= {logoClick3} >
            <img src={myArray37}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick3} className="white-title22">『私』『兄』『仕事』『行く』</a> <br></br>

        <a onClick= {logoClick4} >
            <img src={myArray47}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick4} className="white-title22">『父』『映画』『見る』『好き』</a><br></br>

        <a onClick= {logoClick5} >
            <img src={myArray57}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick5} className="white-title22">『弟』『海』『遊ぶ』『行く』</a><br></br>

        <a onClick= {logoClick6} >
            <img src={myArray67}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick6} className="white-title22">『兄』『趣味』『サッカー』</a><br></br>

        <a onClick= {logoClick7} >
            <img src={myArray77}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick7} className="white-title22">『母』『仕事』『行く』</a><br></br>

        <a onClick= {logoClick8} >
            <img src={myArray87}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick8} className="white-title22">『私』『山』『行く』</a><br></br>

        <a onClick= {logoClick9} >
            <img src={myArray97}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick9} className="white-title22">『あなた』『サッカー』『見る』</a><br></br>

        <a onClick= {logoClick10} >
            <img src={myArray107}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick10} className="white-title22">『あなた』『山』『遊ぶ』『しました』</a><br></br>

        <a onClick= {logoClick11} >
            <img src={myArray117}  width={120} height={88} alt="Logo" />
         </a>
         <a onClick= {logoClick11} className="white-title22">『私』『兄』『車』『買う』『しました』</a> <br></br>

         <a onClick= {logoClick12} >
            <img src={myArray127}  width={120} height={88} alt="Logo" />
         </a>
         <a onClick= {logoClick12} className="white-title22">『私』『兄』『好き』</a><br></br>

        <a onClick= {logoClick13} >
            <img src={myArray137}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick13} className="white-title22">『私』『父』『仕事』『行く』</a> <br></br>

        <a onClick= {logoClick14} >
            <img src={myArray147}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick14} className="white-title22">『母』『山』『遊ぶ』『行く』</a><br></br>

        <a onClick= {logoClick15} >
            <img src={myArray157}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick15} className="white-title22">『父』『趣味』『サッカー』</a><br></br>

        <a onClick= {logoClick16} >
            <img src={myArray167}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick16} className="white-title22">『兄』『仕事』『行く』</a><br></br>

        <a onClick= {logoClick17} >
            <img src={myArray177}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick17} className="white-title22">『父』『海』『行く』『しました』</a><br></br>

        <a onClick= {logoClick18} >
            <img src={myArray187}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick18} className="white-title22">『弟』『サッカー』『見る』</a><br></br>

        <a onClick= {logoClick19} >
            <img src={myArray197}  width={120} height={88} alt="Logo" />
        </a>
        <a onClick= {logoClick19} className="white-title22">『私』『山』『遊ぶ』『しました』</a><br></br>

      </div> 
      </div>

      <div className="title31">

     
      <BarComponent
        onXDataChange={handleXDataChange} // 新しい引数を渡す
        onYDataChange={handleYDataChange}
        onCDataChange={handleCDataChange}
        onZDataChange={handleZDataChange}
        onSDataChange={handleSDataChange}
        onMovieStop = {onMovieStop}
        
        //scrollValue={ans} // 再生位置
        //playbackRate={playbackRate} // 動画の再生速度
        ///onXChange={handleXChange} // クリックイベントを処理するコールバックを渡す
      />

      <div >
  
      <a className="title33">バー間秒数: {y_second ? 
            (y_second - x_second).toFixed(3) + ' 秒' 
            : (videoDuration - x_second).toFixed(3) + ' 秒'}</a><br></br>

     {/*<a className="title22">現在の時間: {currentTime.toFixed(3)} seconds</a><br></br>:*/}
    
      <a className="green-square"></a><a className="white-title21">{myArray5[0]} : {roundedNum}</a>
      <a className="blue-square"></a><a className="white-title21">{myArray5[1]} : {roundedNum1}</a><br></br>
      <a className="yellow-square"></a><a className="white-title21">{myArray5[2]} : {roundedNum2}</a>
      <a className="orange-square"></a><a className="white-title21">{myArray5[3]} : {roundedNum3}</a><br></br>
      <a className="red-square"></a><a className="white-title21">{myArray5[4]} : {roundedNum4}</a>
      
      </div> 

      </div>
    </>
  );
};

export default App;