import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';
import { TranscriptionModalPage } from '../transcription-modal/transcription-modal.page';

// Define the interface for transcription data
interface Transcription {
  fileName: string;
  transcription: string;
  downloadURL?: string;  // Optional if the audio file URL is stored
}

@Component({
  selector: 'app-transcriptions',
  templateUrl: './transcriptions.page.html',
  styleUrls: ['./transcriptions.page.scss'],
})
export class TranscriptionsPage {
  transcriptions: Transcription[] = [];  // Array of transcriptions with type Transcription[]

  constructor(
    private db: AngularFireDatabase,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Fetch transcriptions from Firebase
    this.db.list(`/users/{{ userId }}/audio`).snapshotChanges().subscribe(data => {
      this.transcriptions = data.map(c => ({
        key: c.payload.key, // Include the Firebase key
        ...(c.payload.val() as Transcription)  // Cast the value as Transcription type
      }));
    });
  }

  // Open modal to display the transcription details
  async openModal(transcription: Transcription) {
    const modal = await this.modalController.create({
      component: TranscriptionModalPage,
      componentProps: {
        transcription
      }
    });
    return await modal.present();
  }
}
