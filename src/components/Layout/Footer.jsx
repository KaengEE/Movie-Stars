import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="about">
        React + Vite 프로젝트<br></br> firebase와 다양한 라이브러리를 사용해서
        만든 영화 평점 사이트 입니다.
      </p>
      <div className="link">
        <div className="btn">
          <a href="https://github.com/KaengEE/Movie-Stars" target="_blank">
            깃허브
          </a>
        </div>
        <div className="btn">
          <a
            href="https://blog.naver.com/coding_ori/223290740804"
            target="_blank"
          >
            블로그
          </a>
        </div>
        <div className="btn">
          <a href="" target="_blank">
            포트폴리오
          </a>
        </div>
      </div>

      <p className="copyright">&copy; 2023 React Project KaengEE</p>
    </footer>
  );
}
