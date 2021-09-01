import React, { Component } from "react";
import "./index.css";
import CanvasJSReact from "./assets/canvasjs.react";
import * as Icon from "react-bootstrap-icons";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function nearValue(data) {
  var near = 0;
  var abs = 0;
  var target = 1;
  var min = 100;
  for (var i = 0; i < 7; i++) {
    if (data === null || data === undefined) {
      break;
    }
    abs =
      data[Object.keys(data)[i]] - target < 0
        ? -(data[Object.keys(data)[i]] - target)
        : data[Object.keys(data)[i]] - target;
    if (abs < min) {
      min = abs;
      near = Object.keys(data)[i];
    }
  }
  return near;
}

const COLORS = {
  angry: "#FC0000", // red
  disgusted: "#00FF12", // green
  fearful: "#FF5A00", // orange
  happy: "#F9FF00", // yellow
  neutral: "#717780", // gray
  sad: "#0033FF", //blue
  surprised: "#9232EB", //puple
};

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
    newEmo[parseInt(key)] = emo[key];
    return newEmo;
  }, {}); // key : float to int

let dataPoints1 = [];
for (var i = 0; i < Object.keys(newEmo).length; i++) {
  dataPoints1.push({
    x: Object.keys(newEmo)[i],
    y: parseInt(
      (newEmo[Object.keys(newEmo)[i]].happy +
        newEmo[Object.keys(newEmo)[i]].surprised) *
        100
    ),
    happy: parseInt(newEmo[Object.keys(newEmo)[i]].happy * 100),
    surprised: parseInt(newEmo[Object.keys(newEmo)[i]].surprised * 100),
    markerColor: COLORS[nearValue(newEmo[i])],
  });
}

let dataPoints2 = [];
for (var i = 0; i < Object.keys(newEmo).length; i++) {
  dataPoints2.push({
    x: Object.keys(newEmo)[i],
    y: parseInt(
      (newEmo[Object.keys(newEmo)[i]].angry +
        newEmo[Object.keys(newEmo)[i]].disgusted +
        newEmo[Object.keys(newEmo)[i]].fearful +
        newEmo[Object.keys(newEmo)[i]].sad) *
        100
    ),
    angry: parseInt(newEmo[Object.keys(newEmo)[i]].angry * 100),
    disgusted: parseInt(newEmo[Object.keys(newEmo)[i]].disgusted * 100),
    fearful: parseInt(newEmo[Object.keys(newEmo)[i]].fearful * 100),
    sad: parseInt(newEmo[Object.keys(newEmo)[i]].sad * 100),
    markerColor: COLORS[nearValue(newEmo[i])],
  });
}

class ReportPage extends Component {
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        padding: {
          top: 40,
          bottom: 10,
        },
        text: "감정 분석 리포트",
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        fontSize: 18,
        fontColor: "dimGrey",
      },
      axisY: {
        title: "비율(100%)",
        titleFontFamily: "Candara",
        maximum: 100,
        suffix: "%",
      },
      axisX: {
        title: "영상 시간(단위 : 초)",
        titleFontFamily: "Candara",
        maximum: Object.keys(newEmo).length,
        suffix: "'",
        margin: 20,
      },
      data: [
        {
          showInLegend: true,
          legendText: "Positive",
          type: "line",
          toolTipContent:
            "<strong>Positive</strong> : {y}%<hr/>happy : {happy}%<br/>surprised : {surprised}%",
          dataPoints: dataPoints1,
        },
        {
          showInLegend: true,
          legendText: "Negative",
          type: "line",
          toolTipContent:
            "<strong>Negative</strong> : {y}%<hr/>angry : {angry}%<br/>disgusted : {disgusted}%<br/>fearful : {fearful}%<br/>sad : {sad}%",
          dataPoints: dataPoints2,
        },
      ],
    };
    return (
      <div>
        <div class="p-2">
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
        <div class="px-3 py-5">
          <div class="d-flex flex-row">
            <img
              id="icon1"
              src="https://emojigraph.org/media/apple/magnifying-glass-tilted-left_1f50d.png"
            />
            <div class="align-text-bottom fw-bold fs-3 px-2">
              감정 분석 리포트 가이드
            </div>
          </div>

          <hr />
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <Icon.CheckLg /> 그래프 위에 <strong>커서</strong>를 가져다 대면
              정확한 수치가 보여요!
              <div class="px-4 py-1">
                <Icon.CircleFill color="#FC0000" /> <strong>angry </strong>
                <Icon.CircleFill color="#00FF12" /> <strong>disgusted </strong>
                <Icon.CircleFill color="#FF5A00" /> <strong>fearful </strong>
                <Icon.CircleFill color="#F9FF00" /> <strong>happy </strong>
                <Icon.CircleFill color="#717780" /> <strong>neutral </strong>
                <Icon.CircleFill color="#0033FF" /> <strong>sad </strong>
                <Icon.CircleFill color="#9232EB" /> <strong>surprised </strong>
              </div>
            </li>
            <li class="list-group-item">
              <Icon.CheckLg /> <strong>Positive </strong> 데이터는{" "}
              <mark>happy</mark>, <mark>suprised</mark>로 분류된 감정 데이터
              수치들의 합입니다.
              <div class="px-4 py-1">
                <strong>Negative </strong> 데이터는 <mark>angry</mark>,{" "}
                <mark>disgusted</mark>, <mark>fearful</mark>, <mark>sad</mark>로
                분류된 감정 데이터 수치들의 합입니다.
              </div>
            </li>
            <li class="list-group-item">
              <Icon.CheckLg /> 간혹 특정 시간대의{" "}
              <strong>감정 데이터가 보이지 않는 것</strong>은 동영상 시청 중
              해당 시간에 감정 데이터를 수집하지 못해서 발생한답니다..
              <Icon.EmojiDizzy />.
            </li>
            <li class="list-group-item">
              <Icon.CheckLg /> 해당 리포트에서 보여지는 데이터는 초 단위로
              대표값을 추출하여 제공합니다.
            </li>
          </ul>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto pb-4">
          <a
            class="btn btn-light shadow-sm rounded"
            href="/emotion"
            role="button"
          >
            <div class="d-flex align-items-center flex-row my-2 justify-content-center">
              <Icon.PlayBtn width="50" height="50" color="#8D8C8F" />
              <div class="fs-3 px-3 text-muted">다른 영상보러 가기</div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default ReportPage;
