import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Join.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import GoogleButton from "../components/User/GoogleButton";
import GithubButton from "../components/User/GithubButton";
import { errorMessageToKorean } from "../components/User/auth-components";
import { FirebaseError } from "firebase/app";

export default function Join() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); //네브객체 - 페이지 이동

  // 입력시
  const onChange = (e) => {
    //console.log(e);
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  //submit함수
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); //에러초기화

    // 공백일 경우 return
    if (
      isLoading ||
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    )
      return;
    try {
      //console.log(name, email, password);
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //이름 업데이트
      await updateProfile(credentials.user, {
        displayName: name,
      });
      // home으로 이동
      navigate("/");
    } catch (e) {
      // 에러발생시
      if (e instanceof FirebaseError) {
        //console.log(e.code);
        setError(errorMessageToKorean(e));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="join-container">
        <h1>Join Us</h1>
        <form className="join-form" onSubmit={onSubmit}>
          <input
            onChange={onChange}
            type="text"
            name="name"
            value={name}
            placeholder="이름"
            required
          />
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
          <input
            type="submit"
            value={isLoading ? "Loading..." : "Create Account"}
          />
          <p className="error">{error}</p>
        </form>
        <p>
          이미 계정이 있습니까? <Link to="/login">로그인 →</Link>
        </p>
      </div>
      <div className="button">
        <GoogleButton />
        <GithubButton />
      </div>
    </>
  );
}
