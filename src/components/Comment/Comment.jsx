import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./Comment.css";

export default function Comment({ movieId }) {
  //평가
  const [comments, setComments] = useState([]);

  //movieId가 일치하는 컬렉션의 정보를 가져오기
  const fetchComments = async () => {
    const q = query(
      collection(db, "comment"),
      where("movieId", "==", movieId), //movieId가 같을때
      orderBy("createdAt", "desc"), //최신순
      limit(5) //제한
    );
    const snapshot = await getDocs(q);
    const comments = snapshot.docs.map((doc) => {
      const { comment, createdAt, stars, username, userProfile } = doc.data();
      return {
        comment,
        createdAt: new Date(createdAt).toLocaleDateString("ko-KO"),
        stars,
        username,
        userProfile,
      };
    });
    setComments(comments);
  };

  //시작할때 가져오기
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comment_card">
      {comments.map((comment, index) => (
        <div key={index}>
          <p>작성자: {comment.username}</p>
          <p>{comment.comment}</p>
          <p>별점: {comment.stars}</p>
          <img src={comment.userProfile} alt="userProfile" />
          <p>작성일: {comment.createdAt}</p>
        </div>
      ))}
    </div>
  );
}
