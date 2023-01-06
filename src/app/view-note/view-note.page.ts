import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("TEST")
  }
  ngOnDestroy() {
 
  }
}
