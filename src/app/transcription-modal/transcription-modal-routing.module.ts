import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranscriptionModalPage } from './transcription-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TranscriptionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranscriptionModalPageRoutingModule {}
