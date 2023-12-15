import React, { useState } from "react";
import "./CommentForm.css";
import StarRatings from "react-star-ratings";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CommentForm({ movieId }) {
  const [isLoading, setLoading] = useState(false);
  const [comment, setComment] = useState(""); //평가
  const [stars, setStars] = useState(0); //별점
  const navigate = useNavigate(); //페이지 이동

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

    if (!user) {
      alert("로그인을 해주세요!");
      navigate("/login"); //로그인으로 이동
    }

    if (!user || isLoading || comment === "" || stars === 0) return;

    try {
      setLoading(true);

      //해당영화에 이미 작성했을 경우 x
      const existComment = query(
        collection(db, "comment"),
        where("userId", "==", user.uid),
        where("movieId", "==", movieId),
        limit(1)
      );

      const existSnapshot = await getDocs(existComment);

      if (!existSnapshot.empty) {
        alert("이미 해당 영화에 대한 평가를 남기셨습니다.");
        //초기화
        setComment("");
        setStars(0);
        return;
      }

      //comment 저장
      await addDoc(collection(db, "comment"), {
        comment: comment,
        createdAt: Date.now(),
        username: user.displayName || 이름없음,
        movieId: movieId,
        userId: user.uid,
        stars: stars,
        userProfile: user.photoURL || "",
      });
      //console.log(doc);

      //글작성수증가
      await incrementPostCount(user.uid);
      //console.log("증가합니다.");

      //초기화
      setComment("");
      setStars(0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // post 개수 증가 메서드
  const incrementPostCount = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef); //getDoc

    if (docSnap.exists()) {
      //기존의 값 가져오기
      const postData = docSnap.data();
      const postCount = postData.posts || 0;
      //console.log(postCount);
      //업데이트
      await updateDoc(docRef, {
        posts: postCount + 1,
      });
    } else {
      // 새로 생성
      await setDoc(docRef, { posts: 1 });
    }
  };

  return (
    <form className="comment_form" onSubmit={onSubmit}>
      <p>당신의 평가를 남겨주세요!</p>
      <input
        onChange={onChange}
        type="text"
        value={comment}
        placeholder="평가 남기기"
      />
      <div className="star_rate">
        {/* 별점 */}
        <StarRatings
          rating={stars}
          starRatedColor="orange"
          changeRating={starChange}
          numberOfStars={5}
          starDimension="25px" //별 크기
          name="rating"
        />
      </div>
      <input
        onChange={onChange}
        type="submit"
        value={isLoading ? "로딩중" : "평가하기"}
      />
    </form>
  );
}
