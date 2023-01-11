import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc, getDoc, DocumentReference } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser, getAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ActionSheetController, ToastController } from '@ionic/angular';
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
    private toastController: ToastController
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
  }

  async newNote() {
    const auth = getAuth();
    const user = auth.currentUser;
    const loading = await this.loadingController.create();
    await loading.present();
    const addNote = await addDoc(collection(this.firestore, `users/${user?.uid}/notes`), this.credentials.value)
    this.router.navigateByUrl('/home', { replaceUrl: true });
    await loading.dismiss();
    const toast = await this.toastController.create({
      message: 'Succesfully created new note.',
      duration: 1500,
    });

    await toast.present();
  }

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user != null) {
      const currentDate = new Date();
      this.credentials = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(1)]],
        main: ['', [Validators.minLength(0)]],
        banner: ['', [Validators.minLength(0)]],
        createdAt: currentDate,
        updatetAt: currentDate,
        image: '',
        rememberDate: '',
        expirationDate: '',
      });
    }
  }

}
