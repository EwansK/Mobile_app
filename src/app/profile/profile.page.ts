import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
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

  currentName: string = ''; // Variable to store the current user name

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  // Load the current user data from Firebase
  async loadUserData() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.email = user.email || '';
      
      // Fetch the current name of the user from Firebase Realtime Database
      const userRef = this.db.object(`/users/${user.uid}`).valueChanges();
      userRef.subscribe((userData: any) => {
        if (userData) {
          this.name = userData.name || '';
          this.currentName = this.name; // Store the current name for later comparison
        }
      });
    }
  }

  // Update the user profile information
  async updateProfile() {
    const user = await this.afAuth.currentUser;
    if (user) {
      // Check if no changes have been made to the name and password is not set
      if (this.name === this.currentName && !this.password) {
        const alert = await this.alertCtrl.create({
          header: 'No Changes',
          message: 'No changes were made to the profile.',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      try {
        // Update the user's display name if it has changed
        if (this.name !== this.currentName) {
          await user.updateProfile({
            displayName: this.name,
          });

          // Update the name in Firebase Realtime Database
          await this.db.object(`/users/${user.uid}`).update({
            name: this.name,
          });
        }

        // If a new password is provided, update it
        if (this.password) {
          await user.updatePassword(this.password);
        }

        // Show success message
        const alert = await this.alertCtrl.create({
          header: 'Profile Updated',
          message: 'Your profile has been updated successfully.',
          buttons: ['OK'],
        });
        await alert.present();
      } catch (error) {
        // Show error message in case of failure
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: (error as { message: string }).message || 'Failed to update profile.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
