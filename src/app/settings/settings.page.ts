import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router, private authService: AuthService, private loadingController: LoadingController,) { }

  ngOnInit() {
  }

  async logout() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
    await loading.dismiss();
  }
}
