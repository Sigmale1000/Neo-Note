import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  Auth,
  getAuth
} from '@angular/fire/auth';
import { UserInfo } from 'os';
import { setDoc } from 'firebase/firestore';

const auth = getAuth();
const user = auth.currentUser;





@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  newUser() {
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;

      const UserInfo = {
        email: email
      };

      const addDocument = collection(this.firestore, 'users');
      return setDoc(doc(addDocument, uid), UserInfo)

    } else {
      return console.log('Failed adding registration document')
    }
  }
}