import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Firebase Authentication
import { AngularFireDatabase } from '@angular/fire/compat/database';  // Firebase Realtime Database
import { AlertController } from '@ionic/angular';  // Alert for notifications
import { Router } from '@angular/router';  // Router for redirection

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);

      await userCredential.user?.updateProfile({
        displayName: `${this.name} ${this.lastName}`,
      });

      await this.db.object(`/users/${userCredential.user?.uid}`).set({
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        createdAt: new Date().toISOString(),
      });

      const successAlert = await this.alertCtrl.create({
        header: 'Registro Exitoso',
        message: '¡Gracias por registrarte!',
        buttons: ['OK'],
      });
      await successAlert.present();
      successAlert.onDidDismiss().then(() => {
        this.router.navigate(['/home']);
      });

    } catch (error) {
      const errorAlert = await this.alertCtrl.create({
        header: 'Error',
        message: (error as { message: string }).message || 'Ocurrió un error. Por favor, inténtalo de nuevo.',
        buttons: ['OK'],
      });
      await errorAlert.present();
    }
  }
}
