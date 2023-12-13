import React, { useEffect, useState } from "react";
import "./Mypage.css";
import { auth, db } from "../firebase";
import OneComment from "../components/Comment/OneComment";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export default function Mypage() {
  const user = auth.currentUser;
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const q = query(
      collection(db, "comment"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const comments = snapshot.docs.map((doc) => {
      const {
        comment,
        createdAt,
        userId,
        username,
        userProfile,
        stars,
        movieId,
      } = doc.data();
      return {
        comment,
        createdAt: new Date(createdAt).toLocaleDateString("ko-KO"),
        userId,
        username,
        userProfile,
        stars,
        movieId,
        id: doc.id,
      };
    });
    setComments(comments);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const [moviePosters, setMoviePosters] = useState([]);

  const fetchMoviePoster = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        import.meta.env.VITE_MOVIE_API
      }&language=ko`
    );
    const data = await response.json();
    return data.poster_path;
  };

  const fetchAllMoviePosters = async () => {
    const posterPromises = comments.map((comment) =>
      fetchMoviePoster(comment.movieId)
    );

    const posters = await Promise.all(posterPromises);
    setMoviePosters(posters);
  };

  useEffect(() => {
    fetchAllMoviePosters();
  }, [comments]);

  return (
    <div className="mypage-container">
      <div className="profile">
        {user?.photoURL && <img src={user?.photoURL} alt="User Avatar" />}
        {user?.displayName && <p>{user?.displayName}</p>}
        <button>프로필 수정</button>
      </div>
      <div className="my-comments">
        <p>내 평가 목록</p>
        <div>
          {comments.map((comment, index) => (
            <div className="post-card" key={comment.id}>
              <div className="poster">
                {console.log(comment.movieId)}
                {comment?.movieId && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${moviePosters[index]}`}
                    alt="Movie Poster"
                  />
                )}
              </div>
              <OneComment
                key={comment.id}
                {...comment}
                movieId={comment.movieId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
