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

declare var firebase: any;

@Component({
  selector: 'todo-cmp',
  templateUrl: 'todo/templates/todo.html',
  styleUrls: ['todo/styles/todo.css']
})
export class TodoCmp implements OnInit {



  title: string = "NAbs";

  constructor(private _todoService: TodoService) {

    var config = {
      apiKey: "AIzaSyBRMI7TwCIuiHJ21UbhJwToLjogvyGnrS4",
      authDomain: "nabs-79ba2.firebaseapp.com",
      databaseURL: "https://nabs-79ba2.firebaseio.com",
      storageBucket: "nabs-79ba2.appspot.com",
      messagingSenderId: "321023584395"
    };
    firebase.initializeApp(config);
  }

  ngOnInit() {}
}
