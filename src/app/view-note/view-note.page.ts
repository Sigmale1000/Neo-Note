import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { collection, doc, docData, DocumentReference, Firestore, getDoc, getDocFromServer } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, shareReplay, Subscription, take, tap } from 'rxjs';
@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {
  noteId!: string;
  
  constructor(private route: ActivatedRoute, private firestore: Firestore) {

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
    console.log(this.noteId);
  }

  getNote() {

  }
}