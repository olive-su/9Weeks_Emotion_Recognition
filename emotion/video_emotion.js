import axios from "axios";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./cam_emotion";
import "./video_emotion.css";
import CamEmotion from "./cam_emotion";
import { Modal, Button } from "react-bootstrap";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// id값 path parameter로 받아옴
const VideoEmotionPage = ({ match }) => {
  const { id } = match.params;
  const [videoUrl, setVideoUrl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 반응형 웹으로 구현하는 방법
  // -> 타이머 리셋, 렌더링 반복 -> 속도 저하
  /*
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerWidth,
  });
  useEffect(() => {
    let resizeTimer;
    let windowSizer = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowSize({
          width: document.body.clientWidth,
          height: document.body.clientHeight,
        });
      }, 300);
    };
    window.addEventListener("resize", windowSizer);

    return () => {
      window.removeEventListener("resize", windowSizer);
    };
  }, [windowSize]);
  */

  let videoCode;

  useEffect(function () {
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
  });
  if (videoUrl === null) {
    return (
      /* bootstrap Spinners */
      <div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  // videoUrl에서 videoCode 추출하는 부분
  if (videoUrl) {
    videoCode = videoUrl.split("v=")[1].split("&")[0];
  }
  // 영상 시청 이후 모달창 띄우는 부분
  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (currentTime / duration > 0.99) {
      setModalIsOpen(true);
    }
  };
  // 비디오 옵션 지정 (추가)
  const options = {
    width: document.body.clientWidth * 0.98, // padding 고려하여 비율 0.98지정
    height: document.body.clientHeight * 0.6,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // 자동재생 o
      color: "red", // 영상 진행률 표시
      disablekb: 1, // 키보드 컨트롤러 응답 금지
      fs: 0, // 전체화면 표시 x
      controls: 1, // 0 : 동영상 컨트롤러 표시 x
      rel: 0, // 관련 동영상 표시 x
      playsinline: 1,
    },
  };
  // 감정 인식 데이터 넘겨주는 부분
  const handleExerciseComplete = () => console.log("Data send");
  const handleClose = () => setModalIsOpen(false);
  const handleShow = () => setModalIsOpen(true);
  return (
    <div>
      <div class="d-flex justify-content-center flex-wrap">
        <CamEmotion />
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
          show={modalIsOpen}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>감정 분석 데이터 보내기</Modal.Title>
          </Modal.Header>
          <Modal.Body>영상이 모두 종료되었습니다.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default VideoEmotionPage;
