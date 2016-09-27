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
var router_1 = require('@angular/router');
var explore_service_1 = require('../services/explore-service');
var ExploreCmp = (function () {
    function ExploreCmp(_todoService, route, router) {
        this._todoService = _todoService;
        this.route = route;
        this.router = router;
        this.title = "Explore";
        this.users = [];
        this.userObjects = [];
        this.icon = 1;
        this.usersAndIcon = [];
        this.selectedUserObject = null;
        this.selectedNotification = { notificationId: -1, date: Date, active: false };
        this.selectedNotificationObject = null;
        this.calendarEvents = null;
        this.getUserList();
    }
    ExploreCmp.prototype.ngOnInit = function () {
        //this.getSelectedUser();
        //this.getCalendar();
        this.checkSelectedUser();
    };
    ExploreCmp.prototype.checkSelectedUser = function () {
        var userList = firebase.database().ref('web/selectedUserObject');
        userList.once('value', function (snapshot) {
            if (snapshot.val() != null) {
                for (var _i = 0, _a = this.userObjects; _i < _a.length; _i++) {
                    var user = _a[_i];
                    if (user.id == snapshot.val().id) {
                        console.log(user.id);
                        console.log(snapshot.val().id);
                        this.selectedUserObject = user;
                        for (var _b = 0, _c = this.usersAndIcon; _b < _c.length; _b++) {
                            var a = _c[_b];
                            if (a.userObject.id == snapshot.val().id) {
                                a.active = true;
                            }
                        }
                        firebase.database().ref('web/results').remove();
                    }
                }
            }
        }.bind(this));
    };
    ExploreCmp.prototype.getCalendar = function () {
        var calendarList = firebase.database().ref('web/calendarEvents');
        calendarList.on('value', function (snapshot) {
            this.calendarEvents = snapshot.val();
        }.bind(this));
    };
    ExploreCmp.prototype.getUserList = function () {
        var userList = firebase.database().ref('web/test');
        userList.on('value', function (snapshot) {
            this.userObjects = snapshot.val();
            for (var _i = 0, _a = this.userObjects; _i < _a.length; _i++) {
                var user = _a[_i];
                this.users.push(user.id);
                var iconNumber = Math.floor(Math.random() * 34) + 1;
                this.usersAndIcon.push({ userObject: user, icon: iconNumber, active: false });
            }
        }.bind(this));
    };
    ExploreCmp.prototype.userSelected = function (user) {
        for (var _i = 0, _a = this.usersAndIcon; _i < _a.length; _i++) {
            var a = _a[_i];
            a.active = false;
        }
        for (var _b = 0, _c = this.userObjects; _b < _c.length; _b++) {
            var u = _c[_b];
            if (user.userObject == u) {
                user.active = true;
                this.selectedUserObject = u;
                this.selectedNotificationObject = null;
                firebase.database().ref('web/results').remove();
            }
        }
    };
    ExploreCmp.prototype.notificationSelected = function (notification) {
        console.log(notification.id);
        console.log(this.selectedNotification.id);
        if (notification.id != this.selectedNotification.id) {
            for (var _i = 0, _a = this.selectedUserObject.notifications; _i < _a.length; _i++) {
                var a = _a[_i];
                a.active = false;
            }
            notification.active = true;
            this.calendarEvents = null;
            this.selectedNotification = notification;
            var selNotification = firebase.database().ref('web/selectedNotification');
            selNotification.set(notification);
        }
    };
    ExploreCmp.prototype.simSingle = function () {
        var selNotification = firebase.database().ref('web/fireSingle');
        selNotification.set(this.selectedNotification);
        this.router.navigate(['bead-simulation']);
    };
    ExploreCmp = __decorate([
        core_1.Component({
            selector: 'explore-cmp',
            templateUrl: 'explore/templates/explore.html',
            styleUrls: ['explore/styles/explore.css']
        }), 
        __metadata('design:paramtypes', [explore_service_1.ExploreService, router_1.ActivatedRoute, router_1.Router])
    ], ExploreCmp);
    return ExploreCmp;
}());
exports.ExploreCmp = ExploreCmp;
