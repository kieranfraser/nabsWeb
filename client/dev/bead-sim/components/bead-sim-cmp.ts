import {
  Component,
  Inject,
  OnInit, NgModule
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

import {
  BeadSimService
} from '../services/bead-sim-service';

declare var firebase: any;

@Component({
  selector: 'bead-sim-cmp',
  templateUrl: 'bead-sim/templates/bead-sim.html',
  styleUrls: ['bead-sim/styles/bead-sim.css']
})
export class BeadSimCmp implements OnInit {

  title:string = "Bead Simulation";

  notificationBead: any;
  senderBead: any;
  subjectBead: any;
  appBead: any;
  locationBead: any;
  alertBead: any;

  constructor(private _beadSimService: BeadSimService) {}

  ngOnInit() {
    console.log("bead simulate init");
    this.subscribeToWebEvents();
  }

  subscribeToWebEvents(){
    this.subscribeToNotificaitonBead();
    this.subscribeToSenderBead();
    this.subscribeToSubjectBead();
    this.subscribeToAppBead();
    this.subscribeToLocationInfoBead();
    this.subscribeToAlertInfoBead();
  }

  subscribeToNotificaitonBead(){
    firebase.database().ref('BeadRepo/NOTIFICATION/').on('value', function(snapshot) {
      console.log(snapshot.val());
      this.notificationBead = snapshot.val();
    }.bind(this));
  }

  subscribeToSenderBead(){
    firebase.database().ref('BeadRepo/SENDER/').on('value', function(snapshot) {
      console.log(snapshot.val());
      this.senderBead = snapshot.val();
    }.bind(this));
  }

  subscribeToSubjectBead(){
    firebase.database().ref('BeadRepo/SUBJECT/').on('value', function(snapshot) {
      console.log(snapshot.val());
      this.subjectBead = snapshot.val();
    }.bind(this));
  }

  subscribeToAppBead(){
    firebase.database().ref('BeadRepo/APPLICATION/').on('value', function(snapshot) {
      console.log(snapshot.val());
      this.appBead = snapshot.val();
    }.bind(this));
  }

  subscribeToLocationInfoBead(){
    firebase.database().ref('BeadRepo/LOCATION/').on('value', function(snapshot) {
      console.log(snapshot.val());
      this.locationBead = snapshot.val();
    }.bind(this));
  }

  subscribeToAlertInfoBead(){
    firebase.database().ref('BeadRepo/ALERT/').on('value', function(snapshot) {
      console.log(snapshot.val());
      this.alertBead = snapshot.val();
      this.sendNotification();
    }.bind(this));
  }

  sendNotification():void{
    firebase.database().ref('web/selectedNotification').on('value', function(snapshot) {
      var notification: any = snapshot.val();
      this.fire(notification);
    }.bind(this));
  }

  fire(notification){
    firebase.database().ref('web/fire/').set(notification);
  }
}
