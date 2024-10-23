import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranscriptionsPageRoutingModule } from './transcriptions-routing.module';

import { TranscriptionsPage } from './transcriptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranscriptionsPageRoutingModule
  ],
  declarations: [TranscriptionsPage]
})
export class TranscriptionsPageModule {}
