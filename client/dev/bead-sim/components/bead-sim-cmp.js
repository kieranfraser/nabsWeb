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
var bead_sim_service_1 = require('../services/bead-sim-service');
var BeadSimCmp = (function () {
    function BeadSimCmp(_beadSimService) {
        this._beadSimService = _beadSimService;
        this.title = "Bead Simulation";
        this.results = [];
        this.resultArray = [];
        this.tableResultArray = [];
        this.variable = null;
        this.calendarEvents = null;
        this.selectedResult = null;
        /*notificationBead: any;
        senderBead: any;
        subjectBead: any;
        appBead: any;
        locationBead: any;
        alertBead: any;*/
        // Constants //
        this.result1 = "now";
        this.result2 = "break";
        this.result3 = "period";
        this.result4 = "Little";
        this.result5 = "Much";
    }
    BeadSimCmp.prototype.ngOnInit = function () {
        console.log("bead simulate init");
        this.tableResultArray = [];
        this.counter = -1;
        this.subscribeToVariable();
        if (localStorage.getItem("fireType") == "multiple") {
            console.log(localStorage.getItem("fireType"));
            this.getSelectedUserObject();
        }
        this.subscribeToResults();
    };
    BeadSimCmp.prototype.subscribeToResults = function () {
        firebase.database().ref('web/results').on('value', function (snapshot) {
            if (snapshot.val() != null) {
                var array = [];
                this.results = snapshot.val();
                for (var i = 1; i < this.results.length; i++) {
                    array.push({ id: i, resultObject: this.results[i.toString()] });
                }
                this.resultArray.push(array);
                this.tableResultArray[this.counter] = { a: this.resultArray[this.resultArray.length - 1] };
                console.log("results changed!");
            }
        }.bind(this));
    };
    BeadSimCmp.prototype.subscribeToVariable = function () {
        firebase.database().ref('web/variable').on('value', function (snapshot) {
            if (snapshot.val() != null) {
                this.variable = snapshot.val();
            }
        }.bind(this));
    };
    BeadSimCmp.prototype.getSelectedUserObject = function () {
        firebase.database().ref('web/selectedUserObject').once('value', function (snapshot) {
            this.selectedUserObject = snapshot.val();
            this.fire();
        }.bind(this));
    };
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
    BeadSimCmp.prototype.fire = function () {
        console.log(this.counter);
        this.counter = this.counter + 1;
        firebase.database().ref('web/results/').remove();
        firebase.database().ref('web/fire/').remove();
        firebase.database().ref('web/fire/').set(this.selectedUserObject.id);
    };
    BeadSimCmp.prototype.setVariables = function () {
        firebase.database().ref('web/variable').set(this.variable);
    };
    BeadSimCmp.prototype.clear = function () {
        this.counter = -1;
        this.resultArray = [];
        this.tableResultArray = [];
    };
    BeadSimCmp.prototype.showNotificationDetail = function (notificationId, result) {
        for (var _i = 0, _a = this.selectedUserObject.notifications; _i < _a.length; _i++) {
            var notification = _a[_i];
            if (notification.id == notificationId) {
                this.selectedResult = result;
                //notification.date = this.stringToDate(notification.date);
                this.selectedNotification = notification;
                if (this.selectedNotification.subject.subject == "family") {
                    this.selectedNotification.subjectRank = this.variable.family;
                }
                if (this.selectedNotification.subject.subject == "work") {
                    this.selectedNotification.subjectRank = this.variable.work;
                }
                if (this.selectedNotification.subject.subject == "social") {
                    this.selectedNotification.subjectRank = this.variable.social;
                }
                firebase.database().ref('web/selectedNotification').set(notification);
                this.getCalendar();
            }
        }
    };
    BeadSimCmp.prototype.getCalendar = function () {
        var calendarList = firebase.database().ref('web/calendarEvents');
        calendarList.on('value', function (snapshot) {
            this.calendarEvents = snapshot.val();
            this.convertDates();
        }.bind(this));
    };
    //as months are indexed from 0 in js
    BeadSimCmp.prototype.convertDates = function () {
        for (var _i = 0, _a = this.calendarEvents; _i < _a.length; _i++) {
            var event = _a[_i];
            //event.endDate = this.stringToDate(event.endDate);
            //event.startDate = this.stringToDate(event.startDate);
            var d = new Date(event.endDate);
            event.endDate = d;
            d = new Date(event.startDate);
            event.startDate = d;
        }
    };
    BeadSimCmp.prototype.stringToDate = function (date) {
        var res = date.split(" ");
        var splitDate = res[0].split("/");
        var splitTime = res[1].split(":");
        var day = Number(splitDate[0]);
        var month = Number(splitDate[1]) - 1;
        var year = Number(splitDate[2]) + 2000;
        var hh = Number(splitTime[0]);
        var mm = Number(splitTime[1]);
        var ss = Number(splitTime[2]);
        var convertedDate = new Date(Date.UTC(year, month, day, hh, mm, ss));
        convertedDate.setTime(convertedDate.getTime() + convertedDate.getTimezoneOffset() * 60 * 1000);
        return convertedDate;
    };
    BeadSimCmp.prototype.diffResult = function (index, prevIndex, resultId) {
        console.log("index - " + index);
        console.log("Prev index -" + prevIndex);
        console.log("resultId - " + resultId);
        if (index > 0) {
            var firstArray = this.tableResultArray[prevIndex];
            var secondArray = this.tableResultArray[index];
            var firstResult = firstArray.a[resultId];
            var secondResult = secondArray.a[resultId];
            if (firstResult.resultObject.result != secondResult.resultObject.result) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    BeadSimCmp = __decorate([
        core_1.Component({
            selector: 'bead-sim-cmp',
            templateUrl: 'bead-sim/templates/bead-sim.html',
            styleUrls: ['bead-sim/styles/bead-sim.css']
        }), 
        __metadata('design:paramtypes', [bead_sim_service_1.BeadSimService])
    ], BeadSimCmp);
    return BeadSimCmp;
}());
exports.BeadSimCmp = BeadSimCmp;
