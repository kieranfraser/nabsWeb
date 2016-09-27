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

  selectedUserObject:any;
  results: any;

  /*notificationBead: any;
  senderBead: any;
  subjectBead: any;
  appBead: any;
  locationBead: any;
  alertBead: any;*/

  constructor(private _beadSimService: BeadSimService) {}

  ngOnInit() {
    console.log("bead simulate init");
    this.subscribeToResults();
  }

  subscribeToResults(){
    firebase.database().ref('web/results').on('value', function(snapshot) {
      this.results = snapshot.val();
      this.getSelectedUserObject();
    }.bind(this));
  }

  getSelectedUserObject(){
    firebase.database().ref('web/selectedUserObject').on('value', function(snapshot) {
      this.selectedUserObject = snapshot.val();
      console.log(this.selectedUserObject);
      console.log(this.results);
      for(var notification of this.selectedUserObject.notifications){

      }
    }.bind(this));
  }

  /*subscribeToWebEvents(){
    this.subscribeToNotificaitonBead();
    this.subscribeToSenderBead();
    this.subscribeToSubjectBead();
    this.subscribeToAppBead();
    this.subscribeToLocationInfoBead();
    this.subscribeToAlertInfoBead();
  }

  subscribeToNotificaitonBead(){
    firebase.database().ref('BeadRepo/NOTIFICATION/').on('value', function(snapshot) {
      this.notificationBead = snapshot.val();
    }.bind(this));
  }

  subscribeToSenderBead(){
    firebase.database().ref('BeadRepo/SENDER/').on('value', function(snapshot) {
      this.senderBead = snapshot.val();
    }.bind(this));
  }

  subscribeToSubjectBead(){
    firebase.database().ref('BeadRepo/SUBJECT/').on('value', function(snapshot) {
      this.subjectBead = snapshot.val();
    }.bind(this));
  }

  subscribeToAppBead(){
    firebase.database().ref('BeadRepo/APPLICATION/').on('value', function(snapshot) {
      this.appBead = snapshot.val();
    }.bind(this));
  }

  subscribeToLocationInfoBead(){
    firebase.database().ref('BeadRepo/LOCATION/').on('value', function(snapshot) {
      this.locationBead = snapshot.val();
    }.bind(this));
  }

  subscribeToAlertInfoBead(){
    firebase.database().ref('BeadRepo/ALERT/').on('value', function(snapshot) {
      this.alertBead = snapshot.val();
      this.sendNotification();
    }.bind(this));
  }

  sendNotification():void{
    firebase.database().ref('web/selectedUserObject').on('value', function(snapshot) {
      var user: any = snapshot.val();
      this.fire(user);
    }.bind(this));
  }*/

  fire(user){
    firebase.database().ref('web/fire/').set(user.id);
  }
}
