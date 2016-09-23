"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var todo_service_1 = require('../services/todo-service');
var TodoCmp = (function () {
    function TodoCmp(_todoService) {
        this._todoService = _todoService;
        this.title = "NAbs";
        this.users = [];
        this.icon = 1;
        this.usersAndIcon = [];
        this.selectedUser = { name: "", icon: 0 };
        this.selectedUserObject = null;
        this.selectedNotification = { notificationId: -1, date: Date };
        this.selectedNotificationObject = null;
        this.calendarEvents = null;
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
    TodoCmp.prototype.ngOnInit = function () {
        this.getUserList();
        this.getSelectedUser();
        this.getCalendar();
    };
    TodoCmp.prototype.getSelectedUser = function () {
        var userList = firebase.database().ref('web/selectedUserObject');
        userList.on('value', function (snapshot) {
            this.selectedUserObject = snapshot.val();
        }.bind(this));
    };
    TodoCmp.prototype.getCalendar = function () {
        var calendarList = firebase.database().ref('web/calendarEvents');
        calendarList.on('value', function (snapshot) {
            this.calendarEvents = snapshot.val();
        }.bind(this));
    };
    TodoCmp.prototype.getUserList = function () {
        var userList = firebase.database().ref('web/userStrings');
        userList.on('value', function (snapshot) {
            this.users = snapshot.val();
            for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
                var user = _a[_i];
                var iconNumber = Math.floor(Math.random() * 34) + 1;
                this.usersAndIcon.push({ name: user, icon: iconNumber });
            }
        }.bind(this));
    };
    TodoCmp.prototype.userSelected = function (user) {
        if (user.name != this.selectedUser.name) {
            this.selectedUser = user;
            this.selectedUserObject = null;
            this.selectedNotificationObject = null;
            var selUser = firebase.database().ref('web/selectedUser');
            selUser.set(user.name);
        }
    };
    TodoCmp.prototype.notificationSelected = function (notification) {
        console.log(notification.notificationId);
        console.log(this.selectedNotification.notificationId);
        if (notification.notificationId != this.selectedNotification.notificationId) {
            this.calendarEvents = null;
            this.selectedNotification = notification;
            this.selectedNotificationObject = null;
            var selNotification = firebase.database().ref('web/selectedNotification');
            selNotification.set(notification);
        }
    };
    TodoCmp.prototype.sendNotification = function () {
        var epoch = (new Date).getTime();
        firebase.database().ref('web/fire/').set(this.selectedNotification);
    };
    TodoCmp.prototype.add = function (message) {
    };
    TodoCmp.prototype.remove = function (id) {
    };
    TodoCmp = __decorate([
        core_1.Component({
            selector: 'todo-cmp',
            templateUrl: 'todo/templates/todo.html',
            styleUrls: ['todo/styles/todo.css']
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService])
    ], TodoCmp);
    return TodoCmp;
}());
exports.TodoCmp = TodoCmp;
