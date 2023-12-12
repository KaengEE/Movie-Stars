import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

//영화 API로 데이터 가져오기
export default function MovieList({ type, title }) {
  const [movies, setMovies] = useState([]);

  //영화 API
  async function fetchMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${
        import.meta.env.VITE_MOVIE_API
      }&language=ko`
    );
    const data = await response.json();
    setMovies(data.results);
  }

  useEffect(() => {
    fetchMovies();
  }, [type]);

  return (
    <section className="movie_list" id={`${type}`}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_header"> {title}</h2>
      </header>
      {/* 무비카드 */}
      <div className="movie_cards">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
