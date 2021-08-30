// express 모듈 호출
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const db = require("./config/db");

/* bodyParser 최대 용량 확장 */
app.use(
  express.json({
    limit: "1mb",
  })
);
app.use(
  express.urlencoded({
    limit: "1mb",
    extended: false,
  })
);

// video table 전체 조회
app.get("/video", (req, res) => {
  db.query("select * from video", (err, data) => {
    if (!err) {
      console.log("영상 리스트 불러오기 성공");
      res.send(data);
    } else {
      console.log("영상 리스트 불러오기 실패");
      console.log(err);
      res.send(err);
    }
  });
});

// video table - id 값으로 추출
app.get("/video/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  db.query(`select * from video where id=${id}`, (err, data) => {
    if (!err) {
      console.log("영상 조회 성공");
      res.send(data);
    } else {
      console.log("영상 조회 실패");
      console.log(err);
      res.send(err);
    }
  });
});

app.post("/emotion", (req, res) => {
  const body = req.body;
  const { videoId, emotionData } = body;
  if (!videoId || !emotionData) {
    res.status(400).send("데이터 저장에 필요한 모든 값이 충족되지 않았습니다.");
  }
  db.query(
    `INSERT INTO emotion(videoId, emotionData) VALUES(${videoId}, '${emotionData}')`,
    (err, data) => {
      if (!err) {
        console.log("데이터 저장 성공");
        res.status(400).send(data);
      } else {
        console.log("데이터 저장 실패");
        console.log(err);
        res.status(400).send(err);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});

app.use(cors());
