import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, take, tap } from 'rxjs';
@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {
  note$: Observable<any[]> | undefined;
  constructor(private route: ActivatedRoute) { }
  noteId!: string;
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
}