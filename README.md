# Cordova Plugin FCM Test

This is a test project to help standardise the testing for Cordova Plugin FCM.
 - Use this project to test a new version of the fcm plugin before it gets published to the main branch.
 - Use this project to test a current version of the fcm plugin on a particular device type to confirm a problem
 - Use this project as an example project if you are stuck.

If all the tests are passed, the project managers of Cordova Plugin FCM (ostownsville) should push a new commit to this repo and tag it.

#### Current Plugin Versions:
| Plugin Version| Date Tested | Status  | Comments|
| ------------- |:-------------:|:-------------:| -----:|
| 3.0.2 | 9/11 | Not Working 100% | 

#### Required tests for success:
| App State | Notification Type | Notification Banner | Notification Callback |
| ------------- |:-------------:|:-------------:|:-------------:|
| Background | Silent | No | Yes (next app open) |
| Background | Loud | Yes | No (unless tapped) |
| App Off | Silent | No | Yes (next app open) |
| App Off | Loud | Yes | No (unless tapped) |
| Foreground | Silent | No | Yes |
| Foreground | Loud | No | Yes |
| Background -> Foreground (Tap) | Silent | -- | -- |
| Background -> Foreground (Tap) | Loud |  -- | Yes |

#### Required versions for success:
| Version |
| ------------- |
| iOS 9 ?? |
| iOS 10.3.3 |
| iOS 11.1 |
| Android ??? |

