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
import { db } from "../../firebase";
import "./Comment.css";
import OneComment from "./OneComment";

export default function Comment({ movieId }) {
  //평가
  const [comments, setComments] = useState([]);
  //보여지는 평가
  const [viewComments, setViewComments] = useState([]);
  //로딩
  const [loading, setLoading] = useState(true);
  //평가개수
  const [viewPage, setViewPage] = useState(null); // 기본값

  //평가 페이지
  useEffect(() => {
    if (viewPage !== null) {
      const newComments = comments.slice(0, (viewPage + 1) * 4);
      setViewComments(newComments);
    }
  }, [viewPage]);

  // 실시간 반영
  useEffect(() => {
    // 이벤트 리스너 해제 함수
    let unsub;

    const fetchComments = async () => {
      const q = query(
        collection(db, "comment"),
        where("movieId", "==", movieId),
        orderBy("createdAt", "desc")
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
        setViewPage(0);
        setLoading(false);
      });
    };
    fetchComments();

    return () => unsub();
  }, []);

  //console.log(comments);

  const showMore = () => {
    //limit 에 +4 하기
    setViewPage((prev) => prev + 1);
  };

  return (
    <>
      {viewComments.map((comment) => (
        <OneComment key={comment.id} {...comment} />
      ))}
      {/* 페이지 모두 출력시 더보기 버튼 안보임 */}
      {comments.length / 4 > viewPage + 1 && (
        <div className="more-btn">
          <button onClick={showMore}>더보기</button>
        </div>
      )}
    </>
  );
}
