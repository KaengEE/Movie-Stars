import React from "react";
import { auth, db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import "./OneComment.css";

export default function OneComment({
  username,
  userId,
  id,
  createdAt,
  comment,
  stars,
  userProfile,
}) {
  //현재유저
  const user = auth.currentUser;

  //삭제
  const delComment = () => {
    const ok = confirm("해당 평점을 삭제할까요?");
    if (!ok || user?.uid !== userId) return;
    try {
      //db에 삭제
      deleteDoc(doc(db, "comment", id)); //문서아이디같은 코멘트 삭제
    } catch (e) {
      console.log(e);
    }
  };

  //모달
  const openModal = () => {};

  return (
    <div className="comment_card">
      {comment && (
        <div className="comment_text">
          <div className="comment_user">
            <span>작성자: {username}</span>
            <img src={userProfile} alt="userProfile" />
          </div>
          <p>{comment}</p>
          <div className="text_star">
            <span>별점: {stars}</span>
            <span>작성일: {createdAt}</span>
          </div>
          {user?.uid == userId ? (
            <div className="text_star">
              <button className="edit" onClick={openModal}>
                수정
              </button>
              <button className="delete" onClick={delComment}>
                삭제
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
