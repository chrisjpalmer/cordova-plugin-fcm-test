import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  time:string = null;
  notification:string = "No notification...";
  constructor(public navCtrl: NavController, private fcm:FCM, private platform:Platform) {
	  	if (platform.is('cordova')) {
	  	//NOTIFICATION CODE...
	      this.fcm.getToken().then(t => {
	        console.log("Token Retrieved:" + t);
	      });
	      this.fcm.onTokenRefresh().subscribe(t => {
	        console.log("Token Refreshed:" + t);
	      });
	      this.fcm.onNotification().subscribe(n => {
	      		this.gotNotification(n);
	      });
	  } else {
	  	//Fake one
	  	this.gotNotification({
			"google.c.a.e": "1",
			"wasTapped": false,
			"aps": {
				"alert": {
					"title": "Loud Notification",
					"body": "Loud Notification"
				}
			},
			"gcm.n.e": "1",
			"google.c.a.c_id": "4392638429506218717",
			"google.c.a.udt": "0",
			"gcm.message_id": "0:1510197147597107%0f1fbdd40f1fbdd4",
			"google.c.a.ts": "1510197146"
		})
	  }
  }	

  gotNotification(n) {
  		this.time = (new Date()).toISOString();
	    this.notification = JSON.stringify(n, undefined, 2);
  }

}
