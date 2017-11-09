import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private fcm:FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //NOTIFICATION CODE...
      this.fcm.getToken().then(t => {
        console.log("Token Retrieved:" + t);
      });
      this.fcm.onTokenRefresh().subscribe(t => {
        console.log("Token Refreshed:" + t);
      });
      this.fcm.onNotification().subscribe(n => {
        alert("Notification Received:\n\n\n" + JSON.stringify(n));
      });

    });
  }
}
