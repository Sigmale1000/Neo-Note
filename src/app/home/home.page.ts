import { Component } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser, getAuth } from '@angular/fire/auth';
import { map, Observable, shareReplay, take } from 'rxjs';

import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';



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
    private firestore: Firestore, private auth: Auth, private actionSheetCtrl: ActionSheetController, private authService: AuthService, private router: Router, private toastController: ToastController
  ) {
    this.notes$ = this.getUserNotes().pipe(shareReplay(1));
  }

  getUserNotes(): Observable<any[]> {
    const auth = getAuth();
    const user = auth.currentUser;
    const jc = collection(this.firestore, `users/${user?.uid}/notes`);
    return collectionData(jc, { idField: 'id' })
  }

  async settings() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Settings',
      subHeader: 'Here you can Logout from your account.',
      buttons: [
        {
          text: 'Logout',
          role: 'logout',
          data: {
            action: 'logout',
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

