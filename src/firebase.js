//firebase 설정
import { initializeApp } from "firebase/app";

// 개인설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

//본인 계정의 설정값으로 초기화
firebase.initializeApp(firebaseConfig);

// firestore의 DB서비스
const db = firebase.firestore();

//인증서비스
const auth = firebase.auth();

//시간
const timestamp = firebase.firestore.Timestamp;

export { db, auth, timestamp };
