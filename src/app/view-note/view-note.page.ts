import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { collection, deleteDoc, doc, docData, DocumentReference, Firestore, getDoc, getDocFromServer } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Observable, shareReplay, Subscription, take, tap } from 'rxjs';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {

  noteId!: string;
  noteTitle!: Observable<any[]>;
  noteMain!: Observable<any[]>;
  noteImage!: Observable<any[]>;
  noteCreatedAt!: Observable<any[]>;
  noteUpdatedAt!: Observable<any[]>;
  note: any;

  constructor(private route: ActivatedRoute, private firestore: Firestore, private loadingController: LoadingController, private router: Router, private toastController: ToastController, private authService: AuthService, private actionSheetCtrl: ActionSheetController, private alertController: AlertController) {

  }

  ngOnInit() {
    this.route.params
      .pipe(
        take(1),
        tap((param) => (this.noteId = param['id']))
      )
      .subscribe();
  }

  ionViewDidEnter() {
    this.getNote()
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
          tap((param) => (this.noteImage = noteInfo['banner'])),
        )
        .subscribe();
    }

    await loading.dismiss();
  }

  async deleteNote() {
    const alert = await this.alertController.create({
      header: 'Delete Note?',
      subHeader: 'This action is irreversible.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: () => {
            this.deleteNoteYes();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async deleteNoteYes() {
    const loading = await this.loadingController.create();
    await loading.present();
    const auth = getAuth();
    const user = auth.currentUser;
    const noteRef = doc(this.firestore, `users/${user?.uid}/notes/${this.noteId}`)
    const noteGet = await deleteDoc(noteRef)
    this.router.navigateByUrl('/home', { replaceUrl: true });
    await loading.dismiss();
    const toast = await this.toastController.create({
      message: 'Succesfully deleted note.',
      duration: 1500,
    });

    await toast.present();
  }

  editNote() {

  }
}