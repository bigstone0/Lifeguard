import React from "react";
import "./SignUp.css";
import "./res/ButtonStyle.css";
import { useState } from "react";
import BackgroundLayer from "./res/BackgroundLayer";
import InputComponents from "./res/InputComponents";
import { Link } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../firebase-config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerpassword, setRegisterPassword] = useState("");
  const [name, Setname] = useState();
  const [phone, Setphone] = useState();
  const [email, Setemail] = useState();
  const [errMsg, setErrorMsg] = useState();

  const navigate = useNavigate();

  const register = async () => {
    try {
      setErrorMsg(" ");
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerpassword
      );
      setRegisterEmail("");
      setRegisterPassword("");
      alert("Complete!!");
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/weak-password":
          alert("비밀번호는 6자리 이상이어야 합니다");
          break;
        case "auth/invalid-email":
          alert("잘못된 이메일 주소입니다");
          break;
        case "auth/email-already-in-use":
          alert("이미 가입되어 있는 계정입니다");
          break;
      }
    }
    userdata();
  };

  const userdata = () => {
    axios
      .get("/sign/memberSignUp", {
        params: {
          id: registerEmail,
          pw: registerpassword,
          name: name,
          phone: phone,
          email: email,
        },
      })
      .catch(function () {
        console.log("실패함");
      });
  };

  return (
    <BackgroundLayer>
      <div className="SignUp">
        <p className="BackgroundSubtitle">Sign Up</p>
        <div className="Horizontal">
          <div className="Vertical">
            <div className="InputComponents">
              <p>Id</p>
              <input
                type="text"
                onChange={(e) => {
                  setRegisterEmail(e.target.value);
                }}
                placeholder="이메일 형식"
              />
              <p>Password</p>
              <input
                type="text"
                onChange={(e) => {
                  setRegisterPassword(e.target.value);
                }}
                placeholder="6자리 이상"
              />
              <p>User name</p>
              <input
                type="text"
                onChange={(e) => {
                  Setname(e.target.value);
                }}
                placeholder="사용자 이름"
              ></input>
            </div>
          </div>
          <div className="Vertical">
            <div className="InputComponents">
              <p>Phone Number</p>
              <input
                type="text"
                onChange={(e) => {
                  Setphone(e.target.value);
                }}
                placeholder="000-0000-0000"
              ></input>
              <p>E-mail</p>
              <input
                type="text"
                onChange={(e) => {
                  Setemail(e.target.value);
                }}
                placeholder="이메일 형식"
              ></input>
            </div>
          </div>
        </div>
        <button
          className="ButtonBlueLong"
          onClick={() => {
            register();
          }}
        >
          <p style={{ textDecoration: "none" }}>Create account</p>
        </button>
      </div>
    </BackgroundLayer>
  );
}

export default SignUp;
