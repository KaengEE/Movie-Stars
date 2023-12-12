import { auth } from "../../firebase";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  //로그아웃
  const onLogOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      //로그아웃
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <nav className="navbar">
      <Link to="/" className="link">
        <h1 className="main_title">MovieStars</h1>
      </Link>

      <div className="navbar_links">
        <NavLink to="/">홈</NavLink>
        <NavLink to="/popular">인기순</NavLink>
        <NavLink to="/top_rated">평점순</NavLink>
        <NavLink to="/upcoming">최신순</NavLink>
        <NavLink to="/search">🔎영화검색</NavLink>
      </div>

      <div className="user_links">
        <Link to="/login">로그인</Link>
        <Link onClick={onLogOut} to="/logout">
          로그아웃
        </Link>
        <Link to="/join">회원가입</Link>
        <Link to="/mypage">마이페이지</Link>
      </div>
    </nav>
  );
}
