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
    /*notificationBead: any;
    senderBead: any;
    subjectBead: any;
    appBead: any;
    locationBead: any;
    alertBead: any;*/
    function BeadSimCmp(_beadSimService) {
        this._beadSimService = _beadSimService;
        this.title = "Bead Simulation";
    }
    BeadSimCmp.prototype.ngOnInit = function () {
        console.log("bead simulate init");
        this.subscribeToResults();
    };
    BeadSimCmp.prototype.subscribeToResults = function () {
        firebase.database().ref('web/results').on('value', function (snapshot) {
            this.results = snapshot.val();
            this.getSelectedUserObject();
        }.bind(this));
    };
    BeadSimCmp.prototype.getSelectedUserObject = function () {
        firebase.database().ref('web/selectedUserObject').on('value', function (snapshot) {
            this.selectedUserObject = snapshot.val();
            console.log(this.selectedUserObject);
            console.log(this.results);
            for (var _i = 0, _a = this.selectedUserObject.notifications; _i < _a.length; _i++) {
                var notification = _a[_i];
            }
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
    BeadSimCmp.prototype.fire = function (user) {
        firebase.database().ref('web/fire/').set(user.id);
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
