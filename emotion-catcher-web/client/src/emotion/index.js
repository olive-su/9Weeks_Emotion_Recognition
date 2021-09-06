import React from "react";
import VideoCard from "./video_card";

const EmotionPage = () => {
  return (
    <div>
      <section class="py-1 text-center container">
        <img
          alt="top_banner"
          src="images/top_banner.png"
          width="100%"
          height="100%"
        />
        {/* <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Main title</h1>
            <p class="lead text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              <a href="#" class="btn btn-primary my-2 mx-1">
                로그인
              </a>
              <a href="#" class="btn btn-secondary my-2 mx-1">
                회원가입
              </a>
            </p>
          </div> */}
      </section>

      <div class="album pt-2 pb-5 bg-light">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <VideoCard id="1" />
            <VideoCard id="2" />
            <VideoCard id="3" />
            <VideoCard id="4" />
            <VideoCard id="5" />
            <VideoCard id="6" />
            <VideoCard id="7" />
            <VideoCard id="8" />
            <VideoCard id="9" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionPage;
