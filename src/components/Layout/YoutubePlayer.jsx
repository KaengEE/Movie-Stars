//유튜브로 추천영화 예고편 출력
import React from "react";
import YouTube from "react-youtube";

export default function YoutubePlayer() {
  return (
    <>
      <YouTube
        videoId="-AZ7cnwn2YI"
        opts={{
          width: "80%",
          height: "400",
          origin: "http://localhost:5173", //cors 에러방지
          playerVars: {
            autoplay: 1, //자동재생 O
            mute: 1, //음소거
            rel: 0, //관련 동영상 표시하지 않음
            modestbranding: 1, // youtube 로고를 표시하지 않음
          },
        }}
        //이벤트 리스너
        onEnd={(e) => {
          e.target.stopVideo(0);
        }}
      />
    </>
  );
}
