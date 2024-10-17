import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async onLogin() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Logged in:', userCredential);

      // Redirect to the profile page after successful login
      this.router.navigate(['/profile']);
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Login Failed',
        message: (error as { message: string }).message || 'Please check your login credentials.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
