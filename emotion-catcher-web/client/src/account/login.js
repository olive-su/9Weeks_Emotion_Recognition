import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function LoginPage() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [showToast, setShowToast] = useState(false);

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = (e) => {
    e.preventDefault();
    console.log("click login");
    console.log("ID : ", inputId);
    console.log("PW : ", inputPw);
    axios
      .post("http://localhost:4000/onLogin", {
        id: inputId,
        password: inputPw,
      })
      .then((res) => {
        console.log(res);
        console.log("res.data.id :: ", res.data.id);
        console.log("res.data.msg :: ", res.data.msg);
        if (res.data.id === undefined) {
          // id 일치하지 않는 경우 id = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          setShowToast(true);
        } else if (res.data.id === null) {
          // id는 있지만, pw 는 다른 경우 id = null , msg = undefined
          console.log("입력하신 비밀번호가 일치하지 않습니다.");
          setShowToast(true);
        } else if (res.data.id === inputId) {
          // id, pw 모두 일치 id = userId1, msg = undefined
          console.log("로그인 성공");
          localStorage.setItem("id", inputId);
          document.location.href = "/";
        }
      })
      .catch();
  };

  // 페이지 렌더링 후 가장 처음 호출되는 함수(1번)
  useEffect(() => {
    axios
      .get("http://localhost:4000/login")
      .then((res) => console.log(res))
      .catch();
  }, []);

  return (
    <div class="p-5" width="100%" height="100%">
      <div class="col-md-4 px-lg-5 mx-auto my-5">
        <div class="d-flex justify-content-center">
          <img
            src="/images/logo.png"
            alt="logo"
            class="img-fluid"
            width="350"
            height="auto"
          />
        </div>
        <div class="d-flex justify-content-center col-100 pt-5 text-danger">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={5000}
            autohide
          >
            <Toast.Body>
              <strong>아이디</strong> 또는 <strong>비밀번호</strong>가 일치하지
              않습니다.
            </Toast.Body>
          </Toast>
        </div>
        <form class="py-5">
          <div class="input-group mb-3">
            <div class="input-group-text">
              <Icon.PersonFill color="gray" />{" "}
            </div>
            <input
              type="text"
              class="form-control"
              id="inputId"
              value={inputId}
              onChange={handleInputId}
              placeholder="id"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-text">
              <Icon.KeyFill color="gray" />{" "}
            </div>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              value={inputPw}
              onChange={handleInputPw}
              placeholder="password"
            />
          </div>

          <div class="d-grid gap-2 col-auto pt-3 mx-auto">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={onClickLogin}
            >
              로그인
            </button>
          </div>
          <div class="d-flex justify-content-center mt-4">
            <div class="px-3 links">아직 계정이 없으신가요?</div>
            <a href="/account/join" class="ml-2">
              회원가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
