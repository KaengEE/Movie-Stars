import "./MovieCard.css";
import React from "react";
import { Link } from "react-router-dom";
import Poster from "../../assets/sample-Poster.png";

export default function MovieCard({ movie }) {
  return (
    // 영화 카드
    <Link to={`/movie/${movie.id}`} className="movie_card">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="movie poster"
          className="movie_poster"
        />
      ) : (
        <img src={Poster} className="movie_poster"></img>
      )}

      <div className="movie_details">
        <h3 className="movie_details_heading">{movie.title}</h3>
        <div className="align_center movie_date_rate">
          <p className="align_center">{movie.release_date}</p>
          <p className="align_center">{movie.vote_average.toFixed(2)} ⭐</p>
        </div>
        <p className="movie_description">{movie.overview.slice(0, 100)}...</p>
      </div>
    </Link>
  );
}
