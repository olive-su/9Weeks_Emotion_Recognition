import { useState, useEffect } from "react";
import axios from "axios";
import { Toast, Modal } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function JoinPage() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputNickname, setInputNickname] = useState("");
  const [inputGender, setInputGender] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputAgreeCheck, setInputAgreeCheck] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showToast1, setShowToast1] = useState(false); // 중복 아이디 경고
  const [showToast2, setShowToast2] = useState(false); // 미기입 항목 경고

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const handleInputNickname = (e) => {
    setInputNickname(e.target.value);
  };
  const handleInputGender = (e) => {
    setInputGender(e.target.value);
  };
  const handleInputAge = (e) => {
    setInputAge(e.target.value);
  };
  const handleInputAddress = (e) => {
    setInputAddress(e.target.value);
  };
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };
  const handleInputAgreeCheck = (e) => {
    console.log(e.target.value);
    setInputAgreeCheck(e.target.value);
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    console.log("click submit");
    axios
      .post("http://localhost:4000/join", {
        id: inputId,
        password: inputPw,
        nickname: inputNickname,
        gender: inputGender,
        age: inputAge,
        email: inputEmail,
        address: inputAddress,
      })
      .then((res) => {
        console.log(res);
        console.log("res.data.id : ", res.data.id);
        // 동일 아이디가 존재하는 경우
        if (res.data.msg) {
          setShowToast1(true);
        } else if (
          inputId == "" ||
          inputPw == "" ||
          inputNickname == "" ||
          inputGender == "" ||
          inputAge == ""
        ) {
          setShowToast2(true);
          console.log("필요 항목을 모두 입력하지 않았습니다.");
        } else {
          console.log("회원가입 성공");
          setModalIsOpen(true);
        }
      })
      .catch();
  };

  return (
    <div class="p-3">
      <div class="d-flex flex-column col-lg-5 px-lg-5 mx-auto my-5">
        <h2 class="d-flex align-item-center">
          <Icon.PersonSquare size={40} />
          <span class="px-3"> 회원가입</span>
        </h2>
        <br />
        <p class="text-muted">
          <li>
            귀하의 개인정보는 <strong>리서치</strong> 용도로만 사용합니다.
          </li>
          <li>
            <span class="text-danger">* </span>
            표시가 있는 항목은 <strong>필수 입력 항목</strong> 입니다.
          </li>
        </p>
        <hr />
        <form class="py-3 ">
          <div class="py-2">
            <label for="validationServer01" class="form-label">
              <span class="text-danger">*</span> Id
            </label>
            <input
              type="text"
              class="form-control"
              id="id"
              value={inputId}
              onChange={handleInputId}
              placeholder="아이디를 입력해주세요"
              required
            />
          </div>
          <Toast
            onClose={() => setShowToast1(false)}
            show={showToast1}
            delay={5000}
            autohide
          >
            <Toast.Body>
              이미 <strong>존재하는</strong>아이디입니다.
            </Toast.Body>
          </Toast>
          <div class="py-2">
            <label for="validationServer02" class="form-label">
              <span class="text-danger">*</span> Password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              value={inputPw}
              onChange={handleInputPw}
              placeholder="비밀번호를 입력해주세요"
              required
            />
            <span class="text-muted small px-1">
              비밀번호는 8-20자 길이로 문자와 숫자를 포함해야 하며 공백, 특수
              문자 또는 이모티콘을 포함할 수 없습니다.
            </span>
          </div>
          <div class="py-2">
            <label for="validationServer03" class="form-label">
              <span class="text-danger">*</span> Nickname
            </label>
            <input
              type="text"
              class="form-control"
              id="nickname"
              value={inputNickname}
              onChange={handleInputNickname}
              placeholder="닉네임을 입력해주세요"
              required
            />
          </div>
          <div class="py-2">
            <label for="validationServer04" class="form-label">
              <span class="text-danger">*</span> Gender
            </label>
            <div class="d-flex">
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="gender1"
                  value={1}
                  onChange={handleInputGender}
                  name="radio-stacked"
                  required
                />
                <label class="form-check-label" for="validationFormCheck1">
                  남
                </label>
              </div>
              <div class="form-check mx-3">
                <input
                  type="radio"
                  class="form-check-input"
                  id="gender2"
                  value={2}
                  onChange={handleInputGender}
                  name="radio-stacked"
                  required
                />
                <label class="form-check-label" for="validationFormCheck2">
                  여
                </label>
              </div>
            </div>
          </div>
          <div class="py-2">
            <label for="validationServer05" class="form-label">
              <span class="text-danger">*</span> Age
            </label>
            <input
              type="number"
              class="form-control"
              id="age"
              value={inputAge}
              onChange={handleInputAge}
              placeholder="나이를 입력해주세요"
              required
            />
          </div>
          <div class="py-2">
            <label class="form-label">City</label>
            <select
              class="form-select"
              id="address"
              value={inputAddress}
              onChange={handleInputAddress}
            >
              <option value="">선택안함</option>
              <option value="경기도">경기도</option>
              <option value="강원도">강원도</option>
              <option value="충청북도">충청북도</option>
              <option value="충청남도">충청남도</option>
              <option value="전라북도">전라북도</option>
              <option value="전라남도">전라남도</option>
              <option value="경상북도">경상북도</option>
              <option value="경상남도">경상남도</option>
              <option value="제주특별자치도">제주특별자치도</option>
              <option value="서울특별시">서울특별시</option>
              <option value="부산광역시">부산광역시</option>
              <option value="대구광역시">대구광역시</option>
              <option value="인천광역시">인천광역시</option>
              <option value="광주광역시">광주광역시</option>
              <option value="대전광역시">대전광역시</option>
              <option value="울산광역시">울산광역시</option>
              <option value="세종특별자치시">세종특별자치시</option>
            </select>
          </div>
          <div class="py-2">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              value={inputEmail}
              onChange={handleInputEmail}
              placeholder="ex1234@example.com"
              required
            />
          </div>
          <div class="py-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value={1}
                onChange={handleInputAgreeCheck}
                id="agreeCheck"
                required
              />
              <label class="form-check-label" for="invalidCheck2">
                개인정보 이용약관에 동의합니다.
              </label>
            </div>
          </div>
          <div class="d-flex flex-column pt-2 col-12">
            <div class="d-flex justify-content-center py-2">
              <Toast
                onClose={() => setShowToast2(false)}
                show={showToast2}
                delay={5000}
                autohide
              >
                <Toast.Body>
                  <span class="text-danger">
                    <strong>필수 입력 항목</strong>을 모두 기입해주세요
                  </span>
                </Toast.Body>
              </Toast>
            </div>
            <button
              class="btn btn-primary"
              type="submit"
              onClick={onClickSubmit}
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
      <Modal
        size="lg"
        show={modalIsOpen}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>회원가입이 정상적으로 완료되었습니다.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          아래 <strong>로그인 하러가기</strong> 버튼을 누르면 로그인 페이지로
          이동합니다.
        </Modal.Body>
        <Modal.Footer>
          <a class="btn btn-primary" href="/account/login" role="button">
            로그인하러 가기
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JoinPage;
