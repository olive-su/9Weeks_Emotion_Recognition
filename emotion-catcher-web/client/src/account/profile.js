import { useState, useEffect } from "react";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";

function ProfilePage() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputNickname, setInputNickname] = useState("");
  const [inputGender, setInputGender] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id");
    axios
      .get(`http://localhost:4000/profile/${id}`)
      .then(function (result) {
        setInputId(result.data[0].id);
        setInputPw(result.data[0].password);
        setInputNickname(result.data[0].nickname);
        setInputGender(result.data[0].gender);
        setInputAge(result.data[0].age);
        setInputEmail(result.data[0].email);
        setInputAddress(result.data[0].address);
        console.log(result.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div class="p-3">
      <div class="d-flex flex-column col-lg-5 px-lg-5 mx-auto my-5">
        <h2 class="d-flex align-item-center">
          <Icon.PersonLinesFill size={40} />
          <span class="px-3"> 회원정보</span>
        </h2>
        <hr />
        <form class="py-3 ">
          <fieldset disabled>
            <div class="py-2">
              <label for="validationServer01" class="form-label">
                Id
              </label>
              <input
                type="text"
                class="form-control"
                id="id"
                value={inputId}
                required
              />
            </div>
            <div class="py-2">
              <label for="validationServer02" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                value={inputPw}
                required
              />
            </div>
            <div class="py-2">
              <label for="validationServer03" class="form-label">
                Nickname
              </label>
              <input
                type="text"
                class="form-control"
                id="nickname"
                value={inputNickname}
                required
              />
            </div>
            <div class="py-2">
              <label for="validationServer04" class="form-label">
                Gender
              </label>
              <input
                type="text"
                class="form-control"
                id="gender"
                value={inputGender}
                required
              />
            </div>
            <div class="py-2">
              <label for="validationServer05" class="form-label">
                Age
              </label>
              <input
                type="number"
                class="form-control"
                id="age"
                value={inputAge}
                required
              />
            </div>
            <div class="py-2">
              <label for="validationServer06" class="form-label">
                Address
              </label>
              <input
                type="text"
                class="form-control"
                id="address"
                value={inputAddress}
                required
              />
            </div>
            <div class="py-2">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                value={inputEmail}
                required
              />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
