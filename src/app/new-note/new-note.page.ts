import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc, getDoc, DocumentReference } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser, getAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { delay } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.page.html',
  styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage implements OnInit {
  credentials!: FormGroup;
  result!: string;
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private UserService: DataService,
    private actionSheetCtrl: ActionSheetController,
    private firestore: Firestore,
  ) { }

  async cameraActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Add new banner',
      subHeader: 'Please upload or take a new banner to add to your note',
      buttons: [
        {
          text: 'Upload from device',
          data: {
            action: 'uploadDevice',
          },
        },
        {
          text: 'Take with camera',
          data: {
            action: 'takeCamera',
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

  async chooseDelete() {
    const alert = await this.alertController.create({
      header: 'Do you really want to delete this note?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
        },
      ],
    });

    await alert.present();
  }

  async newNote() {
    const auth = getAuth();
    const user = auth.currentUser;
    const loading = await this.loadingController.create();
    await loading.present();
    const addNote = await addDoc(collection(this.firestore, `users/${user?.uid}/notes`), this.credentials.value)
    this.router.navigateByUrl('/home', { replaceUrl: true });
    await loading.dismiss();
  }

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user != null) {
      const currentDate = new Date();
      this.credentials = this.fb.group({
        Title: ['', [Validators.required, Validators.minLength(1)]],
        Main: ['', [Validators.minLength(0)]],
        createdAt: currentDate,
        updatetAt: currentDate,
        image: '',
        rememberDate: '',
        expirationDate: '',
      });
    }
  }

}
