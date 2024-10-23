import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranscriptionsPage } from './transcriptions.page';

const routes: Routes = [
  {
    path: '',
    component: TranscriptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranscriptionsPageRoutingModule {}
