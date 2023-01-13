import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc, getDoc, DocumentReference, getDocFromServer } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser, getAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ActionSheetController, ToastController } from '@ionic/angular';
import { delay, Observable, take, tap } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {

  credentials!: FormGroup;
  result!: string;
  noteId!: string;
  noteTitle!: Observable<any[]>;
  noteMain!: Observable<any[]>;
  noteBanner!: Observable<any[]>;
  noteUpdatedAt!: Observable<any[]>;

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
    private toastController: ToastController,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit() {
    this.route.params
      .pipe(
        take(1),
        tap((param) => (this.noteId = param['id']))
      )
      .subscribe();

    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user != null) {
      const currentDate = new Date();
      this.credentials = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(1)]],
        main: ['', [Validators.minLength(0)]],
        banner: ['', [Validators.minLength(0)]],
        updatetAt: currentDate,
        rememberDate: '',
        expirationDate: '',
      });
    }
    this.getNote();
  }

  async editNote() {
    const loading = await this.loadingController.create();
    await loading.present();
    const auth = getAuth();
    const user = auth.currentUser;
    const noteRef = doc(this.firestore, `users/${user?.uid}/notes/${this.noteId}`)
    const editNote = updateDoc(noteRef, this.credentials.value)
    console.log(this.credentials.value)
    this.router.navigateByUrl(`/home/view-note/${this.noteId}`, { replaceUrl: true });
    await loading.dismiss();

    const toast = await this.toastController.create({
      message: 'Succesfully edited note.',
      duration: 1500,
    });

    await toast.present();
  }

  async getNote() {
    const loading = await this.loadingController.create();
    await loading.present();
    const auth = getAuth();
    const user = auth.currentUser;
    const noteRef = doc(this.firestore, `users/${user?.uid}/notes/${this.noteId}`)
    const noteGet = await getDocFromServer(noteRef)
    const noteInfo = await noteGet.data();
    if (noteInfo != undefined) {
      this.route.params
        .pipe(
          take(1),
          tap((param) => (this.noteTitle = noteInfo['title'])),
          tap((param) => (this.noteMain = noteInfo['main'])),
          tap((param) => (this.noteBanner = noteInfo['banner'])),
          tap((param) => (this.noteUpdatedAt = noteInfo['updatedAt'])),
        )
        .subscribe();
    }

    await loading.dismiss();
  }


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
}