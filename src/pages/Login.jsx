import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Join.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import GoogleButton from "../components/User/GoogleButton";
import GithubButton from "../components/User/GithubButton";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 입력시
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  //로그인 메서드
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      //로그인
      await signInWithEmailAndPassword(auth, email, password);
      //홈으로
      navigate("/");
    } catch (e) {
      if (e) {
        console.log(e.code);
        setError(e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="join-container">
        <h1>Login</h1>
        <form className="join-form" onSubmit={onSubmit}>
          <input
            onChange={onChange}
            type="email"
            name="email"
            value={email}
            placeholder="이메일"
            required
          />
          <input
            onChange={onChange}
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호"
            required
          />
          <input type="submit" value={isLoading ? "Loading..." : "Login"} />
          <p>{error && error.message}</p>
        </form>
        <p>
          계정이 없으신가요? <Link to="/join">회원가입 →</Link>
        </p>
      </div>
      <div className="button">
        <GoogleButton />
        <GithubButton />
      </div>
    </>
  );
}
