import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./Comment.css";
import OneComment from "./OneComment";

export default function MyComment({ userId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, "comments"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchComments();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (comments.length === 0) {
    return <p>평가가 없습니다.</p>;
  }
  return (
    <>
      {comments.map((comment) => (
        <OneComment key={comment.id} {...comment} />
      ))}
    </>
  );
}
