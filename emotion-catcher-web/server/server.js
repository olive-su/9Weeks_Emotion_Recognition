// express 모듈 호출
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const db = require("./config/db");
app.use(cors());

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
  db.query("SELECT * FROM video", (err, data) => {
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
  db.query(`SELECT * FROM video WHERE id=${id}`, (err, data) => {
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
    `INSERT INTO emotion(video_id, emotion_data) VALUES(${videoId}, '${emotionData}')`,
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

// 회원가입
app.post("/join", (req, res) => {
  const body = req.body;
  const { id, password, nickname, gender, age, address, email } = body;
  console.log(
    `id : ${id} / '${password}', '${nickname}', ${gender} ${age}, '${email}',  '${address}' `
  );
  const sql1 = `SELECT COUNT(*) AS result FROM user WHERE id = '${id}'`;
  db.query(sql1, (err, data) => {
    if (!err) {
      // 동일한 id 존재 X
      if (data[0].result > 0) {
        console.log("같은 이름의 id 존재");
        res.send({ msg: "이미 존재하는 id입니다." });
      } else {
        // id 존재, pw 확인
        const sql2 = `INSERT INTO user(id, password, nickname, gender, age, address, email) VALUES('${id}', '${password}', '${nickname}', ${gender}, ${age}, '${address}', '${email}')`;
        // sql2에 필요한 params 차례로 기입
        db.query(sql2, (err, data) => {
          if (!err) {
            console.log("DB 저장 성공");
            res.send(data[0]);
          } else {
            console.log("DB 저장 실패");
            res.send(err);
          }
        });
      }
    } else {
      res.send(err);
    }
  });
});

// 로그인
app.post("/onLogin", (req, res) => {
  const body = req.body;
  const { id, password } = body;
  console.log(`id : ${id}, password : ${password}`);
  const sql1 = `SELECT COUNT(*) AS result FROM user WHERE id = '${id}'`;
  db.query(sql1, (err, data) => {
    if (!err) {
      // 동일한 id 존재 X
      if (data[0].result < 1) {
        console.log("없는 id 입니다.");
        res.send({ msg: "id가 존재하지 않습니다." });
      } else {
        // id 존재, pw 확인
        const sql2 = `SELECT 
        CASE (SELECT COUNT(*) FROM user WHERE id = '${id}' AND password = '${password}')
            WHEN '0' THEN NULL
            ELSE (SELECT id FROM user WHERE id = '${id}' AND password = '${password}')
        END AS id
        , CASE (SELECT COUNT(*) FROM user WHERE id = '${id}' AND password = '${password}')
            WHEN '0' THEN NULL
            ELSE (SELECT password FROM user WHERE id = '${id}' AND password = '${password}')
        END AS password`;
        // sql2에 필요한 params 차례로 기입
        db.query(sql2, (err, data) => {
          if (!err) {
            console.log("로그인 성공");
            res.send(data[0]);
          } else {
            console.log("로그인 실패");
            res.send(err);
          }
        });
      }
    } else {
      res.send(err);
    }
  });
});

// 회원 정보 조회 - id
app.get("/profile/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  db.query(`SELECT * FROM user WHERE id='${id}'`, (err, data) => {
    if (!err) {
      console.log("회원 정보 조회 성공");
      res.send(data);
    } else {
      console.log("회원 정보 조회 실패");
      console.log(err);
      res.send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
