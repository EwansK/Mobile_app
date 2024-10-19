import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordVoicePage } from './record-voice.page';

const routes: Routes = [
  {
    path: '',
    component: RecordVoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordVoicePageRoutingModule {}
