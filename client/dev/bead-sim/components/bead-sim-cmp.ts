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
  results: any = [];

  resultArray: any = [];

  tableResultArray: any = [];

  variable:any = null;

  counter: number;

  selectedNotification: any;
  calendarEvents = null;
  selectedResult = null;

  /*notificationBead: any;
  senderBead: any;
  subjectBead: any;
  appBead: any;
  locationBead: any;
  alertBead: any;*/

  constructor(private _beadSimService: BeadSimService) {}

  ngOnInit() {
    console.log("bead simulate init");
    this.tableResultArray = [];
    this.counter = -1;
    this.subscribeToVariable();
    if(localStorage.getItem("fireType") == "multiple"){
      console.log(localStorage.getItem("fireType"));
      this.getSelectedUserObject();
    }
    this.subscribeToResults();
  }

  subscribeToResults(){
    firebase.database().ref('web/results').on('value', function(snapshot) {
      if(snapshot.val() != null){
        var array = [];
        this.results = snapshot.val();
        for(var i=1; i<this.results.length; i++){
          array.push({id: i, resultObject: this.results[i.toString()]})
        }
        this.resultArray.push(array);
        this.tableResultArray[this.counter] = {a:this.resultArray[this.resultArray.length - 1]};
        console.log("results changed!");
      }

    }.bind(this));
  }

  subscribeToVariable(){
    firebase.database().ref('web/variable').on('value', function(snapshot) {
      if(snapshot.val() != null){
        this.variable = snapshot.val();
      }

    }.bind(this));
  }

  getSelectedUserObject(){
    firebase.database().ref('web/selectedUserObject').once('value', function(snapshot) {
      this.selectedUserObject = snapshot.val();
      this.fire();
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

  fire(){
    console.log(this.counter);
    this.counter = this.counter + 1;

    firebase.database().ref('web/results/').remove();
    firebase.database().ref('web/fire/').remove();
    firebase.database().ref('web/fire/').set(this.selectedUserObject.id);
  }

  setVariables(){
    firebase.database().ref('web/variable').set(this.variable);
  }

  clear(){
    this.counter=-1;
    this.resultArray=[];
    this.tableResultArray =[];
  }

  showNotificationDetail(notificationId, result){
    for(var notification of this.selectedUserObject.notifications){
      if(notification.id == notificationId){
        this.selectedResult = result;
        //notification.date = this.stringToDate(notification.date);
        this.selectedNotification = notification;
        firebase.database().ref('web/selectedNotification').set(notification);
        this.getCalendar();
      }
    }
  }

  getCalendar(){
    var calendarList = firebase.database().ref('web/calendarEvents');
    calendarList.on('value', function(snapshot) {
      this.calendarEvents  = snapshot.val();
      this.convertDates();
    }.bind(this));
  }

  //as months are indexed from 0 in js
  convertDates(){
    for(var event of this.calendarEvents){
      //event.endDate = this.stringToDate(event.endDate);
      //event.startDate = this.stringToDate(event.startDate);
      var d = new Date(event.endDate);
      event.endDate = d;
      d = new Date(event.startDate);
      event.startDate = d;
    }
  }

  stringToDate(date){
    var res = date.split(" ");
    var splitDate = res[0].split("/");
    var splitTime = res[1].split(":");

    var day = Number(splitDate[0]);
    var month = Number(splitDate[1]) - 1
    var year = Number(splitDate[2])+2000;

    var hh = Number(splitTime[0]);
    var mm = Number(splitTime[1]);
    var ss = Number(splitTime[2]);

    var convertedDate = new Date(Date.UTC(year, month, day, hh, mm, ss));
    convertedDate.setTime( convertedDate.getTime() + convertedDate.getTimezoneOffset()*60*1000 );
    return convertedDate;
  }

}
