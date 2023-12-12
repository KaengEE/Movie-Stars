import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Button.css";

export default function GoogleButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      //구글인증 제공 객체
      const provider = new GoogleAuthProvider();
      //팝업으로 구글인증받기
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div onClick={onClick} className="login-button">
      <img src="/google_logo.svg"></img>
      <span>Continue with Google</span>
    </div>
  );
}
