import { Component, ChangeDetectorRef, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { HighlightJsService } from 'angular2-highlight-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  time:string = null;
  notification:string;

  @ViewChild('textArea')
  textArea:ElementRef;

  constructor(public navCtrl: NavController, private fcm:FCM, private platform:Platform, private cdRef:ChangeDetectorRef, private highlighter : HighlightJsService, private ngZone:NgZone) {
	  	if (platform.is('cordova')) {
	  	//NOTIFICATION CODE...
	      this.fcm.getToken().then(t => {
	        console.log("Token Retrieved:" + t);
	      });
	      this.fcm.onTokenRefresh().subscribe(t => {
	        console.log("Token Refreshed:" + t);
	      });
	      this.fcm.onNotification().subscribe(n => {
	      	this.ngZone.run(() => {
	      		this.gotNotification(n);
	      	})
	      });

	      //this.setNotificationText({ "no":"notification" });
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

  		this.setNotificationText(n);
	    
	    //this.cdRef.detectChanges()
  }

  setNotificationText(t:any) {
  	this.notification =  `<pre>
            <code class="json highlight">` + 
            JSON.stringify(t, undefined, 2) +
        `</code>
        </pre>`;
     this.highlighter.highlight(this.textArea);
  }

}
