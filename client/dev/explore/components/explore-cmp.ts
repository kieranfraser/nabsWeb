import {
  Component,
  Inject,
  OnInit, NgModule
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  userObjects: any[] = [];
  icon = 1;
  usersAndIcon = [];

  selectedUserObject = null;

  selectedNotification = {notificationId:-1, date:Date, active: false};
  selectedNotificationObject = null;

  calendarEvents = null;

  constructor(private _todoService: ExploreService, private route: ActivatedRoute,
              private router: Router) {
    this.getUserList();
  }

  ngOnInit() {
    //this.getSelectedUser();
    //this.getCalendar();
    this.checkSelectedUser();
  }

  checkSelectedUser(){
    var userList = firebase.database().ref('web/selectedUserObject');
    userList.once('value', function(snapshot) {
      if(snapshot.val() != null){
        for(var user of this.userObjects){
          if(user.id == snapshot.val().id){
            console.log(user.id);
            console.log(snapshot.val().id);
            this.selectedUserObject = user;
            for(var a of this.usersAndIcon){
              if(a.userObject.id == snapshot.val().id){
                a.active = true;
              }
            }
            firebase.database().ref('web/results').remove();
          }
        }
      }
    }.bind(this));
  }

  getCalendar(){
    var calendarList = firebase.database().ref('web/calendarEvents');
    calendarList.on('value', function(snapshot) {
      this.calendarEvents  = snapshot.val();
    }.bind(this));
  }

  getUserList():void {
    var userList = firebase.database().ref('web/test');
    userList.on('value', function(snapshot) {
      this.userObjects = snapshot.val();
      for(var user of  this.userObjects){
        this.users.push(user.id);
        var iconNumber = Math.floor(Math.random() * 34) + 1
        this.usersAndIcon.push({userObject: user, icon: iconNumber, active: false});
      }
    }.bind(this));
  }

  userSelected(user):void{
    for(var a of this.usersAndIcon){
      a.active = false;
    }
    for(var u of this.userObjects){
      if(user.userObject == u){
        user.active = true;
        this.selectedUserObject = u;
        this.selectedNotificationObject = null;
        firebase.database().ref('web/results').remove();
      }
    }
  }

  notificationSelected(notification:any):void{
    console.log(notification.id );
    console.log(this.selectedNotification.id);
    if(notification.id != this.selectedNotification.id){
      for(var a of this.selectedUserObject.notifications){
        a.active = false;
      }
      notification.active = true;
      this.calendarEvents = null;
      this.selectedNotification = notification;
      var selNotification = firebase.database().ref('web/selectedNotification');
      selNotification.set(notification);
    }
  }

  simSingle(){
    var selNotification = firebase.database().ref('web/fireSingle');
    selNotification.set(this.selectedNotification);
    this.router.navigate(['bead-simulation']);
  }

}
