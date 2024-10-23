import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-transcription-modal',
  templateUrl: './transcription-modal.page.html',
  styleUrls: ['./transcription-modal.page.scss'],
})
export class TranscriptionModalPage {
  @Input() transcription: any;  // The transcription passed to the modal

  constructor(private modalController: ModalController) {}

  // Close the modal
  dismiss() {
    this.modalController.dismiss();
  }
}
