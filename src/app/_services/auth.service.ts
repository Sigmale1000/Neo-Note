import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore, private router: Router,) { }

  async register({ email, password }: { email: string, password: string }) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.insertUserInfo();
      return user
    } catch (e) {
      return null;
    }

  }

  async insertUserInfo() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {

      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;
      const currentDate = new Date();

      const addDocument = collection(this.firestore, 'users');

      const UserInfo = {
        email: email,
        createdAt: currentDate,
      };

      setDoc(doc(addDocument, uid), UserInfo)

      const docNotesRef = doc(addDocument, user.uid,);
      const colNotesRef = collection(docNotesRef, "notes")

      addDoc(colNotesRef, {
        Title: 'Welcome to Neo Note',
        Main: 'Hello There! <br> Welcome to Neo Note, a place where you can write notes easy, fast and reliable.',
        createdAt: currentDate,
        updatetAt: currentDate,
        createdBy: 'Neo Note',
        image: 'https://github.com/Sigmale1000/neonote/raw/master/md-banner.png',
        rememberDate: currentDate,
        expirationDate: currentDate,
      });

      console.log('Creating account and database with account email: ' + email)
    } else {
      console.log('Failed adding registration document')
      if (user != null) {
        deleteUser(user)
      }
    }
  }


  async login({ email, password }: { email: string, password: string }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }


  logout() {
    signOut(this.auth);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  deleteUser() { }
}