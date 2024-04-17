import { React, useContext, useState } from "react";
import "./SignIn.css";
import "./res/ButtonStyle.css";
import icon_ship_ from "./res/icon_ship_.svg";
import InputComponents from "./res/InputComponents";
import { Link, Navigate } from "react-router-dom";
import { GlobalStateContext } from "./res/GlobalState";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function SignIn() {
  const { setIsLoggedIn } = useContext(GlobalStateContext);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginpassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [loginInfo, setLoginInfo] = useState(1);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setIsLoggedIn(true);
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginpassword
      );
      console.log(user);
      setUser(user.user);
      navigate("/SignageList");
    } catch (error) {
      alert("check id or password");
    }
  };

  return (
    <div className="SignIn">
      <div className="MainTitle">
        <img src={icon_ship_} alt="icon" />
        <p className="TextTitle">
          Smart Lifeguard
          <br />
          Management
        </p>
      </div>

      <div className="LoginForm">
        <p className="NotificationSignIn">Sign in to your account</p>

        <div className="LoginInput">
          <div className="InputComponents">
            <p>Email</p>
            <input
              type="text"
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
              placeholder="이메일 형식"
            />
            <p>Password</p>
            <input
              type="text"
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="ButtonWrapperSignIn">
          <button className="ButtonBlueShort" onClick={login}>
            <p style={{ textDecoration: "none" }}>Sign in</p>
          </button>
        </div>
        <p className="NotificationSignUp">New to Management? Create account</p>
        <div className="ButtonWrapperSignUp">
          <Link to="/SignUp">
            <button className="ButtonBlueShort">
              <p style={{ textDecoration: "none" }}>Sign up</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
