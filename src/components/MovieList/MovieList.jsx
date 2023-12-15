import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";
import _ from "lodash";

export default function MovieList({ type, title }) {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  // 영화 API
  async function fetchMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${
        import.meta.env.VITE_MOVIE_API
      }&language=ko`
    );
    const data = await response.json();
    setMovies(data.results);
    setFilterMovies(data.results);
    console.log(data.results);
  }

  // 정렬 함수
  function handleSort(e) {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  }

  // 정렬 및 필터링
  useEffect(() => {
    let sortedMovies = [...movies];

    if (sort.by !== "default") {
      sortedMovies = _.orderBy(sortedMovies, [sort.by], [sort.order]);
    }

    setFilterMovies(sortedMovies);
  }, [sort]);

  // 영화 로드
  useEffect(() => {
    fetchMovies();
  }, [type]);

  return (
    <section className="movie_list" id={`${type}`}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_header"> {title}</h2>
      </header>
      <div className="sortList">
        <select
          name="by"
          id="by"
          onChange={handleSort}
          className="movie_sorting"
        >
          <option value="default">정렬기준</option>
          <option value="release_date">날짜순</option>
          <option value="vote_count">투표순</option>
        </select>
        <select
          name="order"
          id="order"
          onChange={handleSort}
          className="movie_sorting"
        >
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>
      {/* 무비카드 */}
      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
