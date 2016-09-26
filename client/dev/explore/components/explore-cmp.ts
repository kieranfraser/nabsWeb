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
  ExploreService
} from '../services/explore-service';


declare var firebase: any;

@Component({
  selector: 'explore-cmp',
  templateUrl: 'explore/templates/explore.html',
  styleUrls: ['explore/styles/explore.css']
})
export class ExploreCmp implements OnInit {

  title:string = "Explore";
  users: string[] = [];
  icon = 1;
  usersAndIcon = [];

  selectedUser = {name:"", icon: 0, active: false};
  selectedUserObject = null;

  selectedNotification = {notificationId:-1, date:Date, active: false};
  selectedNotificationObject = null;

  calendarEvents = null;

  constructor(private _todoService: ExploreService) {

  }

  ngOnInit() {
    this.getUserList();
    this.getSelectedUser();
    this.getCalendar();
  }

  getSelectedUser(){
    var userList = firebase.database().ref('web/selectedUserObject');
    userList.on('value', function(snapshot) {
      this.selectedUserObject = snapshot.val();
    }.bind(this));
  }

  getCalendar(){
    var calendarList = firebase.database().ref('web/calendarEvents');
    calendarList.on('value', function(snapshot) {
      this.calendarEvents  = snapshot.val();
    }.bind(this));
  }

  getUserList():void {
    var userList = firebase.database().ref('web/userStrings');
    userList.on('value', function(snapshot) {
      this.users = snapshot.val();
      for(var user of  this.users){
        var iconNumber = Math.floor(Math.random() * 34) + 1
        this.usersAndIcon.push({name: user, icon: iconNumber, active: false});
      }
    }.bind(this));
  }

  userSelected(user):void{
    if(user.name != this.selectedUser.name){
      for(var a of this.usersAndIcon){
        a.active = false;
      }
      user.active = true;
      this.selectedUser = user;
      this.selectedUserObject = null;
      this.selectedNotificationObject = null;
      var selUser = firebase.database().ref('web/selectedUser');
      selUser.set(user.name);
    }
  }

  notificationSelected(notification:any):void{
    console.log(notification.notificationId );
    console.log(this.selectedNotification.notificationId);
    for(var a of this.selectedUserObject.notifications){
      a.active = false;
    }
    this.selectedNotification.active = true;
    if(notification.notificationId != this.selectedNotification.notificationId){

      this.calendarEvents = null;
      this.selectedNotification = notification;
      this.selectedNotificationObject = null;
      var selNotification = firebase.database().ref('web/selectedNotification');
      selNotification.set(notification);
    }
  }
}
