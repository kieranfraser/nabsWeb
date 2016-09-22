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
  }

  private getUserList():void {
    var userList = firebase.database().ref('web/userStrings');
    userList.on('value', function(snapshot) {
      this.users = snapshot.val();
    }.bind(this));
  }

  add(message:string):void {

  }

  remove(id:string):void {

  }
}
