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
var explore_service_1 = require('../services/explore-service');
var ExploreCmp = (function () {
    function ExploreCmp(_todoService) {
        this._todoService = _todoService;
        this.title = "Explore";
        this.users = [];
        this.icon = 1;
        this.usersAndIcon = [];
        this.selectedUser = { name: "", icon: 0, active: false };
        this.selectedUserObject = null;
        this.selectedNotification = { notificationId: -1, date: Date, active: false };
        this.selectedNotificationObject = null;
        this.calendarEvents = null;
    }
    ExploreCmp.prototype.ngOnInit = function () {
        this.getUserList();
        this.getSelectedUser();
        this.getCalendar();
    };
    ExploreCmp.prototype.getSelectedUser = function () {
        var userList = firebase.database().ref('web/selectedUserObject');
        userList.on('value', function (snapshot) {
            this.selectedUserObject = snapshot.val();
        }.bind(this));
    };
    ExploreCmp.prototype.getCalendar = function () {
        var calendarList = firebase.database().ref('web/calendarEvents');
        calendarList.on('value', function (snapshot) {
            this.calendarEvents = snapshot.val();
        }.bind(this));
    };
    ExploreCmp.prototype.getUserList = function () {
        var userList = firebase.database().ref('web/userStrings');
        userList.on('value', function (snapshot) {
            this.users = snapshot.val();
            for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
                var user = _a[_i];
                var iconNumber = Math.floor(Math.random() * 34) + 1;
                this.usersAndIcon.push({ name: user, icon: iconNumber, active: false });
            }
        }.bind(this));
    };
    ExploreCmp.prototype.userSelected = function (user) {
        if (user.name != this.selectedUser.name) {
            for (var _i = 0, _a = this.usersAndIcon; _i < _a.length; _i++) {
                var a = _a[_i];
                a.active = false;
            }
            user.active = true;
            this.selectedUser = user;
            this.selectedUserObject = null;
            this.selectedNotificationObject = null;
            var selUser = firebase.database().ref('web/selectedUser');
            selUser.set(user.name);
        }
    };
    ExploreCmp.prototype.notificationSelected = function (notification) {
        console.log(notification.notificationId);
        console.log(this.selectedNotification.notificationId);
        for (var _i = 0, _a = this.selectedUserObject.notifications; _i < _a.length; _i++) {
            var a = _a[_i];
            a.active = false;
        }
        this.selectedNotification.active = true;
        if (notification.notificationId != this.selectedNotification.notificationId) {
            this.calendarEvents = null;
            this.selectedNotification = notification;
            this.selectedNotificationObject = null;
            var selNotification = firebase.database().ref('web/selectedNotification');
            selNotification.set(notification);
        }
    };
    ExploreCmp = __decorate([
        core_1.Component({
            selector: 'explore-cmp',
            templateUrl: 'explore/templates/explore.html',
            styleUrls: ['explore/styles/explore.css']
        }), 
        __metadata('design:paramtypes', [explore_service_1.ExploreService])
    ], ExploreCmp);
    return ExploreCmp;
}());
exports.ExploreCmp = ExploreCmp;
