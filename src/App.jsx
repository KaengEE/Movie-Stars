import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import MovieList from "./components/MovieList/MovieList";
import SingleMovie from "./components/MovieList/SingleMovie";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Search from "./components/Search/Search";
import Mypage from "./pages/Mypage";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import LoadingSpinner from "./pages/LoadingSpinner";
import Footer from "./components/Layout/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  //초기화 함수
  const init = async () => {
    //파이어베이스 체크
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
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
              element={<MovieList type="upcoming" title="개봉예정" />}
            />
            <Route path="/search" element={<Search />} />
            {/* 로그인/회원가입 */}
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/logout" element={<Navigate to="/login" />} />
            {/* 마이페이지 */}
            <Route path="/mypage" element={<Mypage />} />
            {/* 상세페이지 */}
            <Route path="/movie/:movieId" element={<SingleMovie />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
