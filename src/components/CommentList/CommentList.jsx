import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import SingleComment from "./SingleComment";
import "./CommentList.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CommentList() {
  //리스트 목록
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    let unsub;

    //db에 저장된 평가 리스트 최신순으로 가져오기
    const fetchList = async () => {
      const q = query(
        collection(db, "comment"),
        orderBy("createdAt", "desc"),
        limit(8)
      );

      //실시간
      unsub = onSnapshot(q, (snapshot) => {
        const commentList = snapshot.docs.map((doc) => {
          const {
            comment,
            createdAt,
            stars,
            username,
            userProfile,
            userId,
            movieId,
          } = doc.data();
          return {
            comment,
            createdAt: new Date(createdAt).toLocaleDateString("ko-KO"),
            stars,
            username,
            userProfile,
            userId,
            movieId,
            id: doc.id, //문서 id
          };
        });
        console.log(commentList);
        setCommentList(commentList);
      });
    };
    fetchList();
    return () => unsub();
  }, []);
  // react-slick 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="home-comment">
      <Slider {...settings}>
        {commentList.map((comment) => (
          <SingleComment key={comment.id} {...comment} />
        ))}
      </Slider>
    </div>
  );
}
