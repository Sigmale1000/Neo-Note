import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { delay } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.page.html',
  styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage implements OnInit {
  result!: string;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private UserService: DataService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  async cameraActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Add new banner',
      subHeader: 'Please upload or take a new banner to add to your note',
      buttons: [
        {
          text: 'Upload from device',
          data: {
            action: 'uploadDevice',
          },
        },
        {
          text: 'Take with camera',
          data: {
            action: 'takeCamera',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  }

  async chooseDelete() {
    const alert = await this.alertController.create({
      header: 'Do you really want to delete this note?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
        },
      ],
    });

    await alert.present();
  }


  ngOnInit() {
  }

}
