import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieList/MovieCard";
import CommentList from "../components/CommentList/CommentList";
import "./Home.css";
import YoutubePlayer from "../components/Layout/YoutubePlayer";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    fetchMovies("popular", setPopularMovies);
    fetchMovies("top_rated", setTopRatedMovies);
    fetchMovies("upcoming", setUpcomingMovies);
  }, []);

  async function fetchMovies(type, setMovies) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${
        import.meta.env.VITE_MOVIE_API
      }&language=ko`
    );
    const data = await response.json();
    setMovies(data.results.slice(0, 5)); // Limiting to the first 5 movies
  }

  return (
    <>
      <Head title="추천작" />
      <div className="home-line"></div>
      <Comments title="Hot Comment" />
      <div className="home-line"></div>
      <MovieListSection title="인기작품" movies={popularMovies} />
      <div className="home-line"></div>
      <MovieListSection title="개봉예정" movies={upcomingMovies} />
      <div className="home-line"></div>
      <MovieListSection title="평점순" movies={topRatedMovies} />
    </>
  );
}

function MovieListSection({ title, movies }) {
  return (
    <section className="home_list">
      <header className="align_center home_list_header">
        <h2 className="align_center home_list_header">{title}</h2>
      </header>
      {/* Home_cards */}
      <div className="home_cards">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

function Comments({ title }) {
  return (
    <section className="home_list">
      <header className="align_center home_list_header">
        <h2 className="align_center home_list_header">{title} 🔥</h2>
      </header>
      {/* commentList */}
      <div className="home_cards">
        <CommentList />
      </div>
    </section>
  );
}

function Head({ title }) {
  return (
    <section className="home_list">
      <header className="align_center home_list_header">
        <h2 className="align_center home_list_header">{title} 💖</h2>
      </header>
      {/* commentList */}
      <div className="youtube">
        <YoutubePlayer />
      </div>
    </section>
  );
}
