// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAGCPJWAnu0TFkgmhuQ09ED6IDonGtxL2c",
  authDomain: "goodjobs-images-abe73.firebaseapp.com",
  databaseURL: "gs://goodjobs-images-abe73.appspot.com",
  projectId: "goodjobs-images-abe73",
  storageBucket: "goodjobs-images-abe73.appspot.com",
  messagingSenderId: "160627287391",
  appId: "1:160627287391:web:0593cbc4e0bbdcb0fb82ea",
  measurementId: "G-Y1XCBJNN4V",
};

// firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage();
export { storage, firebase as default };
