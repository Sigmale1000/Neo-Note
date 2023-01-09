import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore, private router: Router, private toastController: ToastController) { }

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
        title: 'Welcome to Neo Note',
        main: 'Hello There! Welcome to Neo Note, a place where you can write notes easy, fast and reliable. Create your first note with our help on Github. We are happy about every new user of our app and we welcome you to give us feedback! There is a lot to come still, so be prepared to see more.',
        createdAt: currentDate,
        updatetAt: currentDate,
        createdBy: 'Neo Note',
        banner: 'https://github.com/Sigmale1000/neonote/raw/master/md-banner.png',
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


  async logout() {
    signOut(this.auth);
    console.log("Logging out of current Account")
    const toast = await this.toastController.create({
      message: 'Succesfully logged out!',
      duration: 1500,
    });

    await toast.present();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
  
  deleteUser() { }
}
