import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { delay } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.page.html',
  styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private UserService: DataService
  ) { }

  async chooseImage() {
    const alert = await this.alertController.create({
      header: 'Upload new Images',
      buttons: ['OK'],
      inputs: [
        {
          label: 'Banner',
          type: 'radio',
          value: 'banner',
        },
        {
          label: 'Image',
          type: 'radio',
          value: 'image',
        },
      ],
    });

    await alert.present();
  }

  async chooseTheme() {
    const alert = await this.alertController.create({
      header: 'Select your color theme',
      buttons: ['OK'],
      inputs: [
        {
          label: 'Dark',
          type: 'radio',
          value: 'dark',
        },
        {
          label: 'Bright',
          type: 'radio',
          value: 'bright',
        },
        {
          label: 'Blue',
          type: 'radio',
          value: 'blue',
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
