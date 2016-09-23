import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

import {
  TodoService
} from '../services/todo-service';

type Todo = {
  todoMessage: string;
  _id?: string;
}

declare var firebase: any;

@Component({
  selector: 'todo-cmp',
  templateUrl: 'todo/templates/todo.html',
  styleUrls: ['todo/styles/todo.css']
})
export class TodoCmp implements OnInit {



  title: string = "NAbs";
  users: string[] = [];
  todoForm: Todo;
  icon = 1;
  usersAndIcon = [];

  selectedUser = {name:"", icon: 0};
  selectedUserObject = null;

  selectedNotification = {notificationId:-1, date:Date};
  selectedNotificationObject = null;

  calendarEvents = null;

  constructor(private _todoService: TodoService) {
    this.todoForm = {
      "todoMessage": ""
    };

    var config = {
      apiKey: "AIzaSyBRMI7TwCIuiHJ21UbhJwToLjogvyGnrS4",
      authDomain: "nabs-79ba2.firebaseapp.com",
      databaseURL: "https://nabs-79ba2.firebaseio.com",
      storageBucket: "nabs-79ba2.appspot.com",
      messagingSenderId: "321023584395"
    };
    firebase.initializeApp(config);

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
        this.usersAndIcon.push({name: user, icon: iconNumber});
      }
    }.bind(this));
  }

  userSelected(user):void{
    if(user.name != this.selectedUser.name){
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
    if(notification.notificationId != this.selectedNotification.notificationId){
      this.calendarEvents = null;
      this.selectedNotification = notification;
      this.selectedNotificationObject = null;
      var selNotification = firebase.database().ref('web/selectedNotification');
      selNotification.set(notification);
    }
  }

  sendNotification():void{
    var epoch = (new Date).getTime();
    firebase.database().ref('web/fire/').set(this.selectedNotification);
  }

  add(message:string):void {

  }



  remove(id:string):void {

  }
}
