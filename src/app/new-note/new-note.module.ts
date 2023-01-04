import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { NewNotePageRoutingModule } from './new-note-routing.module';

import { NewNotePage } from './new-note.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NewNotePageRoutingModule, ReactiveFormsModule],
  declarations: [NewNotePage]
})

export class NewNotePageModule { }

