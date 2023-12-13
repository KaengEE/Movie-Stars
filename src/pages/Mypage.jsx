import React, { useEffect, useState } from "react";
import "./Mypage.css";
import { auth, db, storage } from "../firebase";
import OneComment from "../components/Comment/OneComment";
import Modal from "react-modal";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export default function Mypage() {
  const user = auth.currentUser;
  const [comments, setComments] = useState([]);
  //모달창
  const [isModalOpen, setIsModalOpen] = useState(false);
  //수정이름
  const [newName, setNewName] = useState(user.displayName);
  //프로필사진
  const [avatar, setAvatar] = useState(user?.photoURL);

  const fetchComments = async () => {
    const q = query(
      collection(db, "comment"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const comments = snapshot.docs.map((doc) => {
      const {
        comment,
        createdAt,
        userId,
        username,
        userProfile,
        stars,
        movieId,
      } = doc.data();
      return {
        comment,
        createdAt: new Date(createdAt).toLocaleDateString("ko-KO"),
        userId,
        username,
        userProfile,
        stars,
        movieId,
        id: doc.id,
      };
    });
    setComments(comments);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const [moviePosters, setMoviePosters] = useState([]);

  const fetchMoviePoster = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        import.meta.env.VITE_MOVIE_API
      }&language=ko`
    );
    const data = await response.json();
    return data.poster_path;
  };

  const fetchAllMoviePosters = async () => {
    const posterPromises = comments.map((comment) =>
      fetchMoviePoster(comment.movieId)
    );

    const posters = await Promise.all(posterPromises);
    setMoviePosters(posters);
  };

  useEffect(() => {
    fetchAllMoviePosters();
  }, [comments]);

  //창 닫기
  const openModal = () => {
    setIsModalOpen(true);
  };
  //창 열기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //프로필사진수정
  const onAvatarChange = async (e) => {
    const { files } = e.target; //입력한 파일
    console.log(files);
    if (!user) return; //유저가 없으면 return
    if (files && files.length === 1) {
      const file = files[0];
      //이미지 업로드시 참조주소 avatars/유저id
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      //이미지 파일 업로드
      const result = await uploadBytes(locationRef, file);
      //db에 입력할 주소
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      //인증객체의 user의 프로필 이미지 업데이트
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  //프로필 수정
  const handleEdit = async () => {
    if (!user) return;

    // 새로운 이름 업데이트
    await updateProfile(user, {
      displayName: newName,
    });

    // 새로운 프로필 사진이 선택되었을 경우만 업데이트
    if (avatar !== user.photoURL) {
      await updateProfile(user, {
        photoURL: avatar,
      });
    }

    // 모달 닫기
    closeModal();
  };

  return (
    <div className="mypage-container">
      <div className="profile">
        {avatar && <img src={avatar} alt="User Avatar" />}
        {user?.displayName && <p>{user?.displayName}</p>}
        <button onClick={openModal}>프로필 수정</button>
      </div>
      <div className="my-comments">
        <p>내 평가 목록</p>
        <div>
          {comments.map((comment, index) => (
            <div className="post-card" key={comment.id}>
              <div className="poster">
                {comment?.movieId && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${moviePosters[index]}`}
                    alt="Movie Poster"
                  />
                )}
              </div>
              <OneComment
                key={comment.id}
                {...comment}
                movieId={comment.movieId}
              />
            </div>
          ))}
        </div>
      </div>
      {/* 모달창(수정창) */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Modal"
        className="modal"
      >
        <h2>Profile 수정</h2>
        <button onClick={closeModal} className="close">
          X
        </button>
        <label>
          프로필사진
          <div className="modal-profile">
            {avatar && <img src={avatar} alt="User Avatar" />}
          </div>
          <input
            onChange={onAvatarChange}
            id="avatar"
            type="file"
            accept="image/*"
          />
        </label>
        <label>
          이름:{" "}
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          ></input>
        </label>
        <button onClick={handleEdit}>수정</button>
      </Modal>
    </div>
  );
}
