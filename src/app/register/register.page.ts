import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,AlertController, LoadingController } from '@ionic/angular';
import { AuthService} from "../auth.service"
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  createSuccess = false;
  registerCredentials = { email: '', password: '' };

  constructor( private router: Router, private nav: NavController, 
               private auth: AuthService, private alertCtrl: AlertController, 
               private loading: LoadingController ) { }

  public register() {
    this.auth.register(this.registerCredentials).then(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
    error => {
      this.showPopup("Error", error);
    });
  }

  async showPopup(title, text) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              // console.log('create successs');
              this.router.navigateByUrl('/login');
            }
          }
        }
      ]
    });

    return await alert.present();
  }

}
