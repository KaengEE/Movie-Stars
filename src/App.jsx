import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import MovieList from "./components/MovieList/MovieList";
import SingleMovie from "./components/MovieList/SingleMovie";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/popular"
          element={<MovieList type="popular" title="인기작품" />}
        />
        <Route
          path="/top_rated"
          element={<MovieList type="top_rated" title="최고평점" />}
        />
        <Route
          path="/upcoming"
          element={<MovieList type="upcoming" title="Coming Soon" />}
        />
        {/* 상세페이지 */}
        <Route path="/movie/:movieId" element={<SingleMovie />} />
      </Routes>
    </div>
  );
}

export default App;
