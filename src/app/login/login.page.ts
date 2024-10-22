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
  errorMessage: string = ''; // Variable para almacenar mensajes de error

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async onLogin() {
    this.errorMessage = ''; // 

    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Logged in:', userCredential);

      // Redirigir a la página de perfil después de un inicio de sesión exitoso
      this.router.navigate(['/profile']);
    } catch (error) {
      this.errorMessage = (error as { message: string }).message || 'Por favor, verifica tus credenciales de inicio de sesión.';
      const alert = await this.alertCtrl.create({
        header: 'Error de Inicio de Sesión',
        message: this.errorMessage,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
