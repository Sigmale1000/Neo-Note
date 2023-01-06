import { Component } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser, getAuth } from '@angular/fire/auth';
import { map, Observable, shareReplay, take } from 'rxjs';

import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service'



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  userId!: String;
  notes$: Observable<any[]>;
  result: string | undefined;

  constructor(
    private firestore: Firestore, private auth: Auth, private actionSheetCtrl: ActionSheetController, private authService: AuthService,
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

  async settings() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Example header',
      subHeader: 'Example subheader',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Share',
          data: {
            action: this.authService.logout(),
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  }

  ngOnInit() {
  }
}