import React, { useState, useRef } from "react"

function Video(props) {

  // video 이름(참조 ref) 만들기
  const videoRef = useRef();

  return (
    <>
    <video ref={videoRef} src='media/video.mp4'></video>
    </>
  )
}

export default Video