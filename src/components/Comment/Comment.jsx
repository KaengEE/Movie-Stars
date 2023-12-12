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
  //평가개수
  const [viewComments, setViewComments] = useState(4); // 기본값 4

  // 실시간 반영
  useEffect(() => {
    // 이벤트 리스너 해제 함수
    let unsub;

    const fetchComments = async () => {
      const q = query(
        collection(db, "comment"),
        where("movieId", "==", movieId),
        orderBy("createdAt", "desc"),
        limit(viewComments)
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
  }, [viewComments]);

  //console.log(comments);

  const showMore = () => {
    //limit 에 +4 하기
    setViewComments((prev) => prev + 4);
  };

  return (
    <div className="comment_card">
      {comments.length === 0 ? (
        <span>평가가 아직 없습니다.</span>
      ) : (
        comments.map((comment, index) => (
          <div key={index} className="comment_text">
            <div className="comment_user">
              <span>작성자: {comment.username}</span>
              <img src={comment.userProfile} alt="userProfile" />
            </div>
            <p>{comment.comment}</p>
            <div className="text_star">
              <span>별점: {comment.stars}</span>
              <span>작성일: {comment.createdAt}</span>
            </div>
          </div>
        ))
      )}
      <button onClick={showMore}>더보기</button>
    </div>
  );
}
