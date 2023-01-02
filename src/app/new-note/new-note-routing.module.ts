import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewNotePage } from './new-note.page';

const routes: Routes = [
  {
    path: '',
    component: NewNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewNotePageRoutingModule {}
