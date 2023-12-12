import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="link">
        <h1 className="main_title">MovieStars ⭐</h1>
      </Link>

      <div className="navbar_links">
        <NavLink to="/">인기순</NavLink>
        <NavLink to="/top_rated">평점순</NavLink>
        <NavLink to="/upcoming">최신순</NavLink>
        <NavLink to="/search">🔎영화검색</NavLink>
      </div>
    </nav>
  );
}
