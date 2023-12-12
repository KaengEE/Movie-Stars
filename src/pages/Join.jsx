import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Join.css";

export default function Join() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); //네브객체 - 페이지 이동

  return (
    <div className="join-container">
      <h1>Join Movie Stars</h1>
      <form className="join-form">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="이름"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="이메일"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          required
        />
        <input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
        <p>{error}</p>
      </form>
      <p>
        이미 계정이 있습니까? <Link to="/login">로그인 →</Link>
      </p>
    </div>
  );
}
