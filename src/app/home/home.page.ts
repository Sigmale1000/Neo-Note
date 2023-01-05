import { Component } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser, getAuth } from '@angular/fire/auth';
import { map, Observable, shareReplay, take } from 'rxjs';

import { ActionSheetController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  userId!: String;
  notes$: Observable<any[]>;

  constructor(
    private firestore: Firestore, private auth: Auth, private actionSheetCtrl: ActionSheetController,
  ) {
    this.notes$ = this.getUserNotes().pipe(shareReplay(1));
  }

  getUserNotes(): Observable<any[]> {
    const auth = getAuth();
    const user = auth.currentUser;
    const jc = collection(this.firestore, `users/${user?.uid}/notes`);
    return collectionData(jc, { idField: 'id' })
  }

  openNote() {
    
  }

  ngOnInit() {
  }
}