import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import "./OneComment.css";
import Modal from "react-modal";
import StarRatings from "react-star-ratings";

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
  //모달창
  const [isModalOpen, setIsModalOpen] = useState(false);
  //comment수정
  const [editComment, setEditComment] = useState(comment);
  //별점수정
  const [editStars, setEditStars] = useState(stars);

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
  //수정
  const handleEdit = async () => {
    //console.log(editComment, editStars);
    if (!user || user?.uid !== userId) return;
    try {
      //db에 업데이트
      await updateDoc(doc(db, "comment", id), {
        comment: editComment,
        stars: editStars,
      });
      closeModal(); //창닫기
    } catch (e) {
      console.log(e);
    }
  };

  //창 닫기
  const openModal = () => {
    setIsModalOpen(true);
  };
  //창 열기
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      {/* 모달창(수정창) */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Modal"
        className="modal"
      >
        <h2>Comment 수정</h2>
        <button
          onClick={closeModal}
          onRequestClose={() => setIsModalOpen(false)}
          className="close"
        >
          X
        </button>
        <label>
          평가:
          <input
            type="text"
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
          />
        </label>
        <label>
          평점: {""}
          <StarRatings
            rating={editStars}
            starRatedColor="orange"
            changeRating={setEditStars}
            numberOfStars={5}
            starDimension="25px" //별 크기
            name="rating"
          />
        </label>
        <button onClick={handleEdit}>수정</button>
      </Modal>
    </div>
  );
}
