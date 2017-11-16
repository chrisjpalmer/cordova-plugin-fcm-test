import { Component, ChangeDetectorRef, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { HighlightJsService } from 'angular2-highlight-js';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	time: string = null;

	@ViewChild('textArea')
	textArea: ElementRef;

	constructor(public navCtrl: NavController, private fcm: FCM, private platform: Platform, private cdRef: ChangeDetectorRef, private highlighter: HighlightJsService, private ngZone: NgZone) {

	}

	ngAfterViewInit() {
		this.platform.ready().then(() => {
			this.init();
		});
	}

	init() {
		if (this.platform.is('cordova')) {
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
						"title": "Fake Notification",
						"body": "Fake Notification"
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
		this.time = (new Date()).toTimeString();

		this.setNotificationText(n); 

		//this.cdRef.detectChanges()
	}

	setNotificationText(t: any) {
		this.textArea.nativeElement.innerHTML = `<pre>` +
			JSON.stringify(t, undefined, 2) +
			`</pre>`;
		this.highlighter.highlight(this.textArea.nativeElement);
	}

}
