import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { collection, doc, docData, DocumentReference, Firestore, getDoc, getDocFromServer } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable, shareReplay, Subscription, take, tap } from 'rxjs';
@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {
  noteId!: string;

  constructor(private route: ActivatedRoute, private firestore: Firestore, private loadingController: LoadingController,) {

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
    await loading.dismiss();
  }
}