import React, { useEffect, useState } from "react";
import "./Mypage.css";
import { auth, db } from "../firebase";
import OneComment from "../components/Comment/OneComment";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

// 유저 프로필
export default function Mypage() {
  const user = auth.currentUser;
  //로딩

  const [comments, setComments] = useState([]);

  //유저가 작성한 평가
  const fetchComments = async () => {
    const q = query(
      collection(db, "comment"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const comments = snapshot.docs.map((doc) => {
      const {
        comment,
        createdAt,
        userId,
        username,
        userProfile,
        stars,
        movieId,
      } = doc.data();
      return {
        comment,
        createdAt: new Date(createdAt).toLocaleDateString("ko-KO"),
        userId,
        username,
        userProfile,
        stars,
        movieId,
        id: doc.id,
      };
    });
    setComments(comments);
  };

  //시작할때 가져오기
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="mypage-container">
      <div className="profile">
        {user?.photoURL && <img src={user?.photoURL} alt="User Avatar" />}
        {user?.displayName && <p>{user?.displayName}</p>}
        <button>프로필 수정</button>
      </div>
      <div className="my-comments">
        <p>내 평가</p>
        {comments.map((comment) => (
          <OneComment key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
}
