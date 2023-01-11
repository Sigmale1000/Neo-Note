import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {

  noteId!: string;

  constructor() { }

  ngOnInit() {
  }

}
