import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./video_card.css"; // description 3줄 적용
import * as Icon from "react-bootstrap-icons";

// dayjs 플러그인 (현재 시간으로부터 남은 기간 표시)
dayjs.extend(relativeTime);

function VideoCard(props) {
  const id = props.id; // 컴포넌트 파라미터 -> id
  const videoPage = `emotion/video/${id}`; // 링크 주소 매핑
  const [video, setVideo] = useState(null);
  useEffect(function () {
    axios
      .get(`http://localhost:4000/video/${id}`)
      .then(function (result) {
        /* [{"id":1,"title":" ... thumbnail.jpg"}] 
        리스트 형태로 랩핑 -> idx 0 추출*/
        const video = result.data[0];
        setVideo(video);
        console.log(result.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  if (video === null) {
    return (
      /* bootstrap Spinners */
      <div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <div class="col">
        <div class="card shadow-sm">
          <a
            class="position-relative d-flex justify-content-center align-items-center"
            href={videoPage}
          >
            <div class="position-absolute">
              <Icon.CaretRightFill size={125} color="white" opacity="0.8" />
            </div>
            <img
              width="100%"
              height="100%"
              class="img-fluid"
              src={video.image_url}
            />
          </a>
          <div class="card-body">
            <a class="text-reset" href={videoPage}>
              <h5 class="card-title">{video.title}</h5>
            </a>
            <p class="card-text crop-text-3">{video.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <a
                href={videoPage}
                class="btn btn-sm btn-outline-secondary"
                role="button"
                data-bs-toggle="button"
              >
                영상보기
              </a>
              <div>
                <small class="text-muted text-break mx-2">
                  {video.category}
                </small>
                <small class="text-muted mx-2">
                  {dayjs(video.deadline).fromNow()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
