import { useState, useRef, useEffect} from 'react'
import './App.css'
import Video from './components/video';

function App() {
  const [duration, setDuration] = useState(0); // 영상 길이
  const [currentTime, setCurrentTime] = useState(0); // 현재 진행시간

  // video 이름(참조 ref) 만들기
  const videoRef = useRef();

  // 비디오 재생 hook
  useEffect(() => {
    setCurrentTime(videoRef.current.currentTime); // 현재시간
    setDuration(videoRef.current.duration);

    // 비디오 메타데이터가 로드 될 때 duration을 업데이트한다.
    const handleLoadedMetadata = () => {
      setDuration(videoRef.current.duration);
    };

    videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);


    // 매 초마다 비디오 시간 hook
    let videoInterval = setInterval(()=> {
      console.log(videoRef.current.currentTime);
      setCurrentTime(videoRef.current.currentTime);
    }, 1000);

    // clean up 인터벌 함수 제거
    return () => {
      clearInterval(videoInterval);
    }

  }, [currentTime]);

  // console.log(currentTime, duration);

  // play
  const playVid = () => {
    // console.log(videoRef.current);
    videoRef.current.play();
  }

  // pause
  const pauseVid = () => {
    videoRef.current.pause();
  }

  // stop(중단하고 처음으로 돌아가기)
  const stopVid = () => {
    videoRef.current.pause();
    
    videoRef.current.currentTime = 0;
    
    setCurrentTime(0);
  }

  return (
    <div className='App'>
      <h1>React Video Player</h1>

      <Video />
      {/* <video ref={videoRef} src='media/video.mp4'></video> */}

      <div className='time-info'>
      <p>{currentTime.toFixed(1)}s / {duration.toFixed(1)}s</p>

        {/* 영상 진행도를 알려주는 바 */}
        <progress 
          style={{width: '100%'}}
          min="0" 
          max="100" 
          value={duration ? (currentTime*100) /duration : 0}
        />
      </div>

      <div className="btn-group">
        <button className='play' onClick={playVid}>Play</button>
        <button className='pause' onClick={pauseVid}>Pause</button>
        <button className='stop' onClick={stopVid}>Stop</button>
      </div>
    </div>
  )
}

export default App
