// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY2QQZnDo27ys0cTkdS6BeQry8aQCe1YI",
  authDomain: "neonote-e776f.firebaseapp.com",
  projectId: "neonote-e776f",
  storageBucket: "neonote-e776f.appspot.com",
  messagingSenderId: "1004925165701",
  appId: "1:1004925165701:web:48d026e01dec816f4089ec",
  measurementId: "G-0T6VVS6G21"
};

// Initialize Firebase
const firebase_db = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase_db);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
