import axios from "axios";
import { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
import { Modal, Button } from "react-bootstrap";
import * as faceapi from "face-api.js";

// id값 path parameter로 받아옴
const VideoEmotionPage = ({ match }) => {
  const { id } = match.params;
  const [videoUrl, setVideoUrl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoState, setVideoState] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);
  const [emotionData, setEmotionData] = useState(false);
  const [initializing, setInitializing] = useState(false);
  let videoCode;
  const videoHeight = 240;
  const videoWidth = 360;
  const videoRef = useRef();
  const canvasRef = useRef();

  /*
sessionStorage 비움(이전 데이터 축적 방지)
서버에서 영상 정보 받아옴
*/
  useEffect(() => {
    window.sessionStorage.clear();
    axios
      .get(`http://localhost:4000/video/${id}`)
      .then(function (result) {
        const videoUrl = result.data[0].videoUrl;
        setVideoUrl(videoUrl);
        console.log(result.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const errorCallback = function (e) {
    console.log("모델 로드에 실패했습니다, 다시 시도해주세요.", e);
  };

  /* 
  <모델 로드>
  - 사용 API : 얼굴, 랜드마크, 표정 감지
  */
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(() => {
        navigator.getUserMedia(
          {
            video: {},
          },
          (stream) => (videoRef.current.srcObject = stream),
          errorCallback
        );
      });
    };
    loadModels();
  }, []);

  /*
  비디오가 재생 상태(1)일 경우 
  감정 데이터, 현재 재생 위치(시간) 데이터 sessionStorage에 저장
  */
  useEffect(() => {
    if (videoState === 1) {
      window.sessionStorage.setItem(currentTime, JSON.stringify(emotionData));
    }
  });

  /*
  모델 적용 및 조정, draw
  */
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

      // detections 데이터(감정 데이터)가 있을 경우에만 emotionData로 저장
      if (detections.length === 1) {
        setEmotionData(detections[0].expressions);
      }
    }, 100);
  };

  /* 비디오 로딩 실패 */
  if (videoUrl === null) {
    return (
      <div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  /* videoUrl에서 videoCode 추출 */
  if (videoUrl) {
    videoCode = videoUrl.split("v=")[1].split("&")[0];
  }

  /* 
  - currentTime : 영상 재생 위치
  - videoState : 영상 재생 여부(1 : 재생중)
  - duration : 영상 전체 길이

  현재 재생 시간, 상태 받아옴 
  종료 시, 모달창 띄움
  */

  const checkElapsedTime = (e) => {
    setInterval(async () => {
      const currentTime = e.target.getCurrentTime();
      setCurrentTime(currentTime);
    }, 100);
    const videoState = e.target.playerInfo.playerState;
    const duration = e.target.getDuration();
    const currenteTime = e.target.getCurrentTime();

    setVideoState(videoState);

    console.log("duration : ", duration);
    console.log("videoState : ", videoState);
    if (currenteTime / duration > 0.99) {
      setModalIsOpen(true);
    }
  };

  /* 유튜브 비디오 재생 정보 설정 */
  const options = {
    width: document.body.clientWidth * 0.8, // padding 고려하여 비율 0.98지정
    height: document.body.clientHeight * 0.5,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // 1 : 자동재생
      color: "red", // 영상 진행률 표시
      disablekb: 1, // 키보드 컨트롤러 응답 금지
      fs: 0, // 전체화면 표시 x
      controls: 0, // 0 : 동영상 컨트롤러 표시 x
      rel: 0, // 관련 동영상 표시 x
      playsinline: 1,
    },
  };

  // 모달 닫기 버튼(최종 -> 삭제)
  const handleClose = () => setModalIsOpen(false);
  const handleShow = () => setModalIsOpen(true);
  const modalEvent = () => {
    let emo = JSON.stringify(window.sessionStorage);
    emo = emo.replace(/"{/g, "{");
    emo = emo.replace(/"}/g, "}");
    emo = emo.replace(/}"/g, "}");
    emo = emo.replace(/\\"/g, '"');
    emo = JSON.parse(emo);
    let newEmo = {};
    newEmo = Object.keys(emo)
      .sort()
      .reduce((newEmo, key) => {
        newEmo[key] = emo[key];
        return newEmo;
      }, {});
    newEmo = JSON.stringify(newEmo);
    console.log(newEmo, typeof newEmo);
    axios
      .post("http://localhost:4000/emotion", {
        videoId: id,
        emotionData: newEmo,
      })
      .catch((err) => {
        console.log(err);
      })
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div>
      <div class="d-flex justify-content-center align-items-center flex-wrap m-2">
        <div class="d-flex justify-content-end">
          <video
            ref={videoRef}
            autoPlay
            muted
            height={videoHeight}
            width={videoWidth}
            onPlay={handleVideoOnplay}
          />
          <canvas ref={canvasRef} class="position-absolute" />
        </div>
        <div
          class="alert alert-warning d-flex align-items-center shadow"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div>
            영상을 <strong>집중해서</strong> 봐주세요!
          </div>
        </div>
        <YouTube
          videoId={videoCode}
          containerClassName="embed embed-youtube"
          onStateChange={(e) => checkElapsedTime(e)}
          opts={options}
        />
      </div>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
        <Modal
          size="lg"
          show={modalIsOpen}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>영상이 모두 종료되었습니다.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            다음 페이지에서 <strong>나의 감정 분석 리포트</strong>를
            확인해보세요!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기(없앨 버튼)
            </Button>
            <Button variant="primary" onClick={modalEvent}>
              감정 분석 리포트 확인하러 가기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default VideoEmotionPage;
