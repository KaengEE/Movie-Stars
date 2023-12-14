import React from "react";
import { Link } from "react-router-dom";

export default function SingleComment({
  username,
  createdAt,
  comment,
  stars,
  userProfile,
  movieId,
}) {
  return (
    <Link to={`/movie/${movieId}`} style={{ textDecoration: "none" }}>
      <div>
        <div className="comment_text">
          <div className="comment_user">
            <span>작성자: {username}</span>
            <img src={userProfile} alt="userProfile" />
          </div>
          <p>{comment}</p>
          <div className="text_star">
            <span>별점: {stars}</span>
            <span>작성일: {createdAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
