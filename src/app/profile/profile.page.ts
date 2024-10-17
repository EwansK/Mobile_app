import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';  // If you're using Firebase Realtime Database
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,  
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  // Load current user data from Firebase
  async loadUserData() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.email = user.email || '';
      
      // If you're using Realtime Database to store extra info like the user's name
      const userRef = this.db.object(`/users/${user.uid}`).valueChanges();
      userRef.subscribe((userData: any) => {
        if (userData) {
          this.name = userData.name || '';
        }
      });
    }
  }

  // Update user profile information
  async updateProfile() {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        // Update the user's display name in Firebase Authentication
        await user.updateProfile({
          displayName: this.name,
        });

        // Optionally update password if the user has entered a new one
        if (this.password) {
          await user.updatePassword(this.password);
        }

        // Update the user's name in Firebase Realtime Database
        await this.db.object(`/users/${user.uid}`).update({
          name: this.name,
        });

        const alert = await this.alertCtrl.create({
          header: 'Actualización exitosa',
          message: 'Tu perfil ha sido actualizado correctamente.',
          buttons: ['OK'],
        });
        await alert.present();
      } catch (error) {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: (error as { message: string }).message || 'Error al actualizar el perfil.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
