import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Button.css";

export default function GoogleButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      //깃허브인증 제공 객체
      const provider = new GithubAuthProvider();
      //팝업으로 깃허브인증받기
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div onClick={onClick} className="login-button">
      <img src="/github-logo.svg"></img>
      <span>Continue with GitHub</span>
    </div>
  );
}
