import React, { useState } from "react";
import "./CommentForm.css";
import StarRatings from "react-star-ratings";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function CommentForm({ movieId }) {
  const [isLoading, setLoading] = useState(false);
  const [comment, setComment] = useState(""); //평가
  const [stars, setStars] = useState(0); //별점

  //작성 메서드
  const onChange = (e) => {
    setComment(e.target.value);
  };
  //별점 메서드
  const starChange = (value) => {
    setStars(value);
  };
  //console.log(comment, stars);

  //db에 저장
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || comment === "" || stars === 0) return;
    try {
      setLoading(true);
      //comment 저장
      const doc = await addDoc(collection(db, "comment"), {
        comment: comment,
        createdAt: Date.now(),
        username: user.displayName || 이름없음,
        movieId: movieId,
        userId: user.uid,
        stars: stars,
        userProfile: user.photoURL || "",
      });
      console.log(doc);
      //초기화
      // setComment("");
      // setStars(0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="comment_form" onSubmit={onSubmit}>
      <input
        onChange={onChange}
        type="text"
        value={comment}
        placeholder="평가 남기기"
      />
      {/* 별점 */}
      <StarRatings
        rating={stars}
        starRatedColor="orange"
        changeRating={starChange}
        numberOfStars={5}
        name="rating"
      />
      <input
        onChange={onChange}
        type="submit"
        value={isLoading ? "로딩중" : "평가하기"}
      />
    </form>
  );
}
