import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewNotePageRoutingModule } from './new-note-routing.module';

import { NewNotePage } from './new-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewNotePageRoutingModule
  ],
  declarations: [NewNotePage]
})
export class NewNotePageModule {}
