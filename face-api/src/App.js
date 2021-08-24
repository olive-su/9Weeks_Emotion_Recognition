/* 
face-api 적용 코드

face-api 내 모든 모듈이 해당 파일에 맞춰져있어서
weight(binary) 파일 + manifest(json) 파일을 동일 이름으로 변경 후 사용해야할 듯
*/

import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./App.css"; // 비디오 화면 내 draw 이미지 조정

function App() {
  const videoHeight = 480;
  const videoWidth = 640;
  const [initializing, setInitializing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(startVideo);
    };
    loadModels();
  }, []);

  /* parameter 3 - error code 추가 */
  const errorCallback = function (e) {
    console.log("Rejected!", e);
  };
  // 카메라 작동
  const startVideo = () => {
    navigator.getUserMedia(
      {
        video: {},
      },
      (stream) => (videoRef.current.srcObject = stream),
      errorCallback
    );
  };

  const handleVideoOnplay = () => {
    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

      // 얼굴이 감지되지 않는 경우는 undefined가 됨(값이 아예 안들어가는듯) - 콘솔 창에서는 에러가 함
      // DB 저장시, undefined 따로 처리해줘야함 + undefined 지속 시 alert 띄우는 작업 추가
      console.log(detections[0].expressions);
    }, 100);
  };

  return (
    <div className="App">
      <div className="display-flex justify-content-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          height={videoHeight}
          width={videoWidth}
          onPlay={handleVideoOnplay}
        />
        <canvas ref={canvasRef} className="position-absolute" />
      </div>
    </div>
  );
}

export default App;
