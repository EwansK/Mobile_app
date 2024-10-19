import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

// Declare Cordova plugins
declare var navigator: any;
declare var window: any;

@Component({
  selector: 'app-record-voice',
  templateUrl: './record-voice.page.html',
  styleUrls: ['./record-voice.page.scss'],
})
export class RecordVoicePage {
  constructor(
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private db: AngularFireDatabase,
    private platform: Platform
  ) {}

  async recordVoice() {
    try {
      // Capture audio using the Cordova Media Capture plugin
      const options = { limit: 1, duration: 60 }; // Max 60 seconds
      navigator.device.capture.captureAudio(
        (mediaFiles: any[]) => {
          const file = mediaFiles[0];
          this.uploadAudio(file);
        },
        (error: any) => {
          console.error('Error capturing audio:', error);
        },
        options
      );
    } catch (error) {
      console.error('Error recording voice:', error);
    }
  }

  async uploadAudio(file: any) {
    try {
      const filePath = this.platform.is('ios') ? file.fullPath : 'file://' + file.fullPath;

      // Get the authenticated user
      const user = await this.afAuth.currentUser;
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      // Generate a unique file name
      const fileName = `audio_${new Date().getTime()}.m4a`;
      const fileRef = this.afStorage.ref(`users/${user.uid}/audio/${fileName}`);

      // Read and upload the audio file
      window.resolveLocalFileSystemURL(filePath, (fileEntry: any) => {
        fileEntry.file((fileData: any) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result !== null) {
              const blob = new Blob([reader.result as ArrayBuffer], { type: 'audio/m4a' });

              // Upload the blob to Firebase Storage
              const uploadTask = fileRef.put(blob);
              uploadTask.snapshotChanges()
                .pipe(finalize(async () => {
                  const downloadURL = await fileRef.getDownloadURL().toPromise();
                  // Save the download URL in Firebase Realtime Database
                  this.db.list(`/users/${user.uid}/audio`).push({ fileName, downloadURL });
                  console.log('Audio uploaded successfully:', downloadURL);
                }))
                .subscribe();
            } else {
              console.error('Error: FileReader result is null.');
            }
          };
          reader.readAsArrayBuffer(fileData);
        });
      }, (err: any) => {
        console.error('Error resolving file path:', err);
      });
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  }
}
