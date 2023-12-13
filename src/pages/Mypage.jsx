import React from "react";
import { auth } from "../firebase";
import "./Mypage.css";

//유저 프로필
export default function Mypage() {
  //현재유저
  const user = auth.currentUser;

  return (
    <div className="mypage-container">
      <div className="profile">
        <img src={user.photoURL} />
        <p>{user.displayName}</p>
        <button>프로필수정</button>
      </div>
      <div className="my-comments">
        <p>내 평가</p>
      </div>
    </div>
  );
}
