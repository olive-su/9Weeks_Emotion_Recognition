import React from "react";
import "./index.css";
import { Carousel } from "react-bootstrap";

function MainPage() {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/7_thumbnail.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>[넷플릭스] 오징어 게임</h3>
            <p>
              넷플릭스 《오징어 게임》 죽거나 혹은 마지막까지 살아남거나 456억
              원을 차지하게 될 단 한명은? 《오징어 게임》 9월 17일 공개!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/8_thumbnail.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>[공익광고협의회] 털린 그림 찾기</h3>
            <p>
              프로알바생 이도현이 찾은 일상 속 털린 그림 같이 찾아볼까요? 잠깐?️
              부모님도 우리 아이를 위해 같이 찾아 주실꺼죠?
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/9_thumbnail.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>[GUCCI] 구찌 가옥</h3>
            <p>
              항상 놀라움을 선사하는 구찌(@gucci)에서 이태원에 새로운
              플래그십스토어 ‘구찌 가옥’ 을 선보입니다!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* 링크 컨테이너 */}
      <div class="position-relative overflow-hidden p-md-5 text-center">
        <div class="col-md-5 p-lg-5 mx-auto my-5">
          <h1 class="display-4 fw-normal">
            AI Reseacher
            <br /> 'Emotion Catcher'
          </h1>
          <p class="lead fw-normal">
            영상 콘텐츠에 대한 소비자의 반응을 실시간 분석
          </p>
        </div>
        <div class="product-device shadow-sm d-none d-md-block"></div>
        <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>

      {/* description 1 */}

      <hr class="my-5 featurette-divider" />
      <div class="row featurette mx-5">
        <div class="col-md-7 my-5 text-center">
          <h2 class="featurette-heading">
            소비자의 반응을 바로
            <br />
            <span class="fs-2 text-muted"> 실시간 캐치 </span>
          </h2>
          <br />
          <p class="lead">
            소비자의 표정을 <strong>실시간</strong>으로 분석하여 알려주는 리서치
            서비스
          </p>
        </div>
        <div class="col-md-5">
          <img
            class="img-fluid"
            alt="intro_img1"
            src="images/main_intro_1.png"
            width="500"
            height="500"
          />
        </div>
      </div>

      {/* description 2 */}

      <hr class="featurette-divider" />

      <div class="row featurette mx-5">
        <div class="col-md-7 order-md-2 my-5 text-center">
          <h2 class="featurette-heading">
            <p class="fs-2">
              <u>저비용</u> <u>고효율</u>
            </p>
            <span class="text-muted"> 온라인 리서치</span>
          </h2>
          <br />
          <p class="lead">
            기존의 포커스 그룹 인터뷰 보다
            <br /> <strong>저렴한 비용</strong>으로 더 다양한 인터뷰이와 진행이
            가능합니다.
          </p>
        </div>
        <div class="col-md-5 order-md-1">
          {" "}
          <img
            class="img-fluid"
            alt="intro_img2"
            src="images/main_intro_2.png"
            width="500"
            height="500"
          />
        </div>
      </div>

      {/* description 3 */}

      <hr class="my-5 featurette-divider" />

      <div class="row featurette mx-5">
        <div class="col-md-7 my-5 text-center">
          <h2 class="featurette-heading">
            시간 절약 <br />
            <span class="fs-2 text-muted"> 원스톱 진행</span>
          </h2>
          <p class="lead">
            소비자의 반응 실시간 분석에서 결과보고서까지 <br />
            원스톱으로 진행이 됩니다.
          </p>
        </div>
        <div class="col-md-5">
          <img
            class="img-fluid"
            alt="intro_img3"
            src="images/main_intro_3.png"
            width="500"
            height="500"
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
