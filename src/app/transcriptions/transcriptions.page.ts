import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-transcriptions',
  templateUrl: './transcriptions.page.html',
  styleUrls: ['./transcriptions.page.scss'],
})
export class TranscriptionsPage implements OnInit {
  transcriptions: any[] = [];  // Holds all transcriptions

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadTranscriptions();  // Load transcriptions on component load
  }

  // Load the transcriptions from Firebase Realtime Database
  async loadTranscriptions() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.db.list(`/users/${user.uid}/audio`).valueChanges().subscribe((data: any[]) => {
        this.transcriptions = data;
      });
    }
  }

  // Confirm deletion before proceeding
  async confirmDeleteTranscription(index: number, fileName: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar la transcripción "${fileName}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteTranscription(index, fileName);
          }
        }
      ]
    });

    await alert.present();
  }

  // Delete transcription from Firebase
  async deleteTranscription(index: number, fileName: string) {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        // Delete transcription from Firebase
        await this.db.object(`/users/${user.uid}/audio/${fileName}`).remove();

        // Remove from the local list (to update the UI without needing a reload)
        this.transcriptions.splice(index, 1);

        // Show success message
        const alert = await this.alertCtrl.create({
          header: 'Eliminado',
          message: `La transcripción "${fileName}" ha sido eliminada correctamente.`,
          buttons: ['OK'],
        });
        await alert.present();
      } catch (error) {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Hubo un error al eliminar la transcripción.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
