import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SingleMovie.css";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import Poster from "../../assets/sample-Poster.png";

export default function SingleMovie() {
  const { movieId } = useParams();
  const [details, setDetails] = useState([]); //영화데이터
  const [loading, setLoading] = useState(true);

  //api 가져오기
  async function fetchSingleMovie() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        import.meta.env.VITE_MOVIE_API
      }&language=ko`
    );
    const data = await response.json();
    //데이터 저장
    setDetails(data);
    //console.log(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchSingleMovie();
  }, []);

  //이전으로
  const navigate = useNavigate();
  // 이전 페이지로 이동
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  //링크공유
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: details.title,
          text: `${details.title} - ${details.tagline} 확인해보세요`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("공유 중 오류 발생:", error);
      }
    } else {
      alert("현재 브라우저에서는 공유하기를 지원하지 않습니다");
    }
  };

  return (
    <>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="movie_detail">
          <div className="detail_box">
            <div className="detail_title">
              <h2>{details.title}</h2>
              <h4>- {details.tagline}</h4>
            </div>
            <div className="detail">
              {/* 포스터 */}
              <div className="detail_poster">
                {details.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                    alt=""
                  />
                ) : (
                  <img src={Poster}></img>
                )}
              </div>
              {/* 상세내용 */}
              <div className="detail_content">
                <p className="detail_p">
                  제목: {details.title} ({details.original_title})
                </p>
                <p className="detail_p">개봉일: {details.release_date} </p>
                <p className="detail_p">
                  평점: {details.vote_average?.toFixed(2)}점
                </p>
                <p className="detail_p">상영시간: {details.runtime}분</p>
                <p className="content">줄거리: {details.overview}</p>
              </div>
            </div>
            {/* 공유버튼 */}
            <div className="share" onClick={handleShare}>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="share-icon"
              >
                <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
              </svg>
            </div>
            <div className="btn">
              <button onClick={handleGoBack}>이전으로</button>
            </div>
          </div>
        </div>
      )}
      {/* 평가박스 */}
      <div className="movie_detail">
        <div className="comment_box">
          <p>무비스타들의 평가</p>
          {/* comment 리스트 */}
          <div>
            <Comment movieId={movieId} />
          </div>
          {/* 나도작성하기 */}
          <div>
            <CommentForm movieId={movieId} />
          </div>
        </div>
      </div>
    </>
  );
}
