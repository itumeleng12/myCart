import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from "../auth.service"
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  loading;
  registerCredentials = { email: '', password: '' };

  constructor( private router: Router, private auth: AuthService, private alertCtrl: AlertController, 
               private loadingCtrl: LoadingController ) {  } 
  ngOnInit() {
    console.log(this.router.url);
    if( this.router.url === '/logout') {
      this.logout();
    }
  }

  async login() {
    await this.showLoading();

    this.auth.login(this.registerCredentials).then(allowed => {
      if (allowed) {
        this.loading.dismiss();
        this.router.navigateByUrl('/home');
      } else {
        this.showAlert("Fail","Access Denied");
      }
    },
      error => {
        this.showAlert("Fail",error);
      });
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    return await this.loading.present();
  }

  async showAlert(header, text) {
    console.log('show error');
    if( typeof this.loading != "undefined" ) this.loading.dismiss();

    let alert = await this.alertCtrl.create({
      header: header,
      message: text,
      buttons: ['OK']
    });

    alert.present();
  }

  public logout() {
    console.log('logout');
    this.auth.logout();
    this.showAlert("Logout", "You have successfully logged out");
  }

}