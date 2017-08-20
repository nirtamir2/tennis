import Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAUmMjnfHpfZedFC1YVjcXLH2sU8SBzrEc",
  authDomain: "tennis-dbb4b.firebaseapp.com",
  databaseURL: "https://tennis-dbb4b.firebaseio.com",
  projectId: "tennis-dbb4b",
  storageBucket: "tennis-dbb4b.appspot.com",
  messagingSenderId: "449882235088"
};

let firebaseApp = Firebase.initializeApp(config);
let db = firebaseApp.database();
let storage = firebaseApp.storage();
let auth = firebaseApp.auth();

export {firebaseApp, db, storage, auth};
