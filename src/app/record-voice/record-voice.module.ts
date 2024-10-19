import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordVoicePageRoutingModule } from './record-voice-routing.module';

import { RecordVoicePage } from './record-voice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordVoicePageRoutingModule
  ],
  declarations: [RecordVoicePage]
})
export class RecordVoicePageModule {}
