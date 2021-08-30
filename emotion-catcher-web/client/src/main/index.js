import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Carousel, Container, Button, Nav } from "react-bootstrap";

function MainPage() {
  return (
    <div>
      {/* 슬라이딩 배너 - react bootstrap bootstrap 변환 필요*/}
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* 링크 컨테이너 */}
      <div class="position-relative overflow-hidden p-md-5 text-center">
        <div class="col-md-5 p-lg-5 mx-auto my-5">
          <h1 class="display-4 fw-normal">Main headline</h1>
          <p class="lead fw-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
          <a class="btn btn-outline-secondary" href="#">
            Button Text
          </a>
        </div>
        <div class="product-device shadow-sm d-none d-md-block"></div>
        <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>

      {/* description 1 */}

      <hr class="my-5 featurette-divider" />
      <div class="row featurette mx-5">
        <div class="col-md-7 my-5 text-center">
          <h2 class="featurette-heading">
            First featurette heading.{" "}
            <span class="text-muted">Style text.</span>
          </h2>
          <p class="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div class="col-md-5">
          <svg
            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#eee" />
            <text x="50%" y="50%" fill="#aaa" dy=".3em">
              500x500
            </text>
          </svg>
        </div>
      </div>

      {/* description 2 */}

      <hr class="featurette-divider" />

      <div class="row featurette mx-5">
        <div class="col-md-7 order-md-2 my-5 text-center">
          <h2 class="featurette-heading">
            Second featurette heading.{" "}
            <span class="text-muted">Style text.</span>
          </h2>
          <p class="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div class="col-md-5 order-md-1">
          <svg
            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#eee" />
            <text x="50%" y="50%" fill="#aaa" dy=".3em">
              500x500
            </text>
          </svg>
        </div>
      </div>

      {/* description 3 */}

      <hr class="my-5 featurette-divider" />

      <div class="row featurette mx-5">
        <div class="col-md-7 my-5 text-center">
          <h2 class="featurette-heading">
            Third featurette heading.{" "}
            <span class="text-muted">Style text.</span>
          </h2>
          <p class="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div class="col-md-5">
          <svg
            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#eee" />
            <text x="50%" y="50%" fill="#aaa" dy=".3em">
              500x500
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
