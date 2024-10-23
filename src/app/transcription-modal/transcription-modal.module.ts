import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranscriptionModalPageRoutingModule } from './transcription-modal-routing.module';

import { TranscriptionModalPage } from './transcription-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranscriptionModalPageRoutingModule
  ],
  declarations: [TranscriptionModalPage]
})
export class TranscriptionModalPageModule {}
