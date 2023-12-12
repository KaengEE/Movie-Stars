import {
  collection,
  limit,
  onSnapshot,
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
  //로딩
  const [loading, setLoading] = useState(true);

  // 실시간 반영
  useEffect(() => {
    // 이벤트 리스너 해제 함수
    let unsub;

    const fetchComments = async () => {
      const q = query(
        collection(db, "comment"),
        where("movieId", "==", movieId),
        orderBy("createdAt", "desc"),
        limit(4)
      );

      //실시간 업데이트
      unsub = onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map((doc) => {
          const { comment, createdAt, stars, username, userProfile } =
            doc.data();
          return {
            comment,
            createdAt: new Date(createdAt).toLocaleDateString("ko-KO"),
            stars,
            username,
            userProfile,
          };
        });
        setComments(comments);
        setLoading(false);
      });
    };
    fetchComments();
    return () => unsub();
  }, []);

  //console.log(comments);

  return (
    <div className="comment_card">
      {comments.length === 0 ? (
        <span>평가가 아직 없습니다.</span>
      ) : (
        comments.map((comment, index) => (
          <div key={index}>
            <p>작성자: {comment.username}</p>
            <p>{comment.comment}</p>
            <p>별점: {comment.stars}</p>
            <img src={comment.userProfile} alt="userProfile" />
            <p>작성일: {comment.createdAt}</p>
          </div>
        ))
      )}
    </div>
  );
}
