import {
  collection,
  deleteDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import "./Comment.css";
import OneComment from "./OneComment";

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
          const { comment, createdAt, stars, username, userProfile, userId } =
            doc.data();
          return {
            comment,
            createdAt: new Date(createdAt).toLocaleDateString("ko-KO"),
            stars,
            username,
            userProfile,
            userId,
            id: doc.id, //문서id
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
    <>
      {comments.map((comment) => (
        <OneComment key={comment.id} {...comment} />
      ))}
      <div className="more-btn">
        <button onClick={showMore}>더보기</button>
      </div>
    </>
  );
}
