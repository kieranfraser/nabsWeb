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
    }
    BeadSimCmp.prototype.ngOnInit = function () {
        console.log("bead simulate init");
        this.subscribeToWebEvents();
    };
    BeadSimCmp.prototype.subscribeToWebEvents = function () {
        this.subscribeToNotificaitonBead();
        this.subscribeToSenderBead();
        this.subscribeToSubjectBead();
        this.subscribeToAppBead();
        this.subscribeToLocationInfoBead();
        this.subscribeToAlertInfoBead();
    };
    BeadSimCmp.prototype.subscribeToNotificaitonBead = function () {
        firebase.database().ref('BeadRepo/NOTIFICATION/').on('value', function (snapshot) {
            console.log(snapshot.val());
            this.notificationBead = snapshot.val();
        }.bind(this));
    };
    BeadSimCmp.prototype.subscribeToSenderBead = function () {
        firebase.database().ref('BeadRepo/SENDER/').on('value', function (snapshot) {
            console.log(snapshot.val());
            this.senderBead = snapshot.val();
        }.bind(this));
    };
    BeadSimCmp.prototype.subscribeToSubjectBead = function () {
        firebase.database().ref('BeadRepo/SUBJECT/').on('value', function (snapshot) {
            console.log(snapshot.val());
            this.subjectBead = snapshot.val();
        }.bind(this));
    };
    BeadSimCmp.prototype.subscribeToAppBead = function () {
        firebase.database().ref('BeadRepo/APPLICATION/').on('value', function (snapshot) {
            console.log(snapshot.val());
            this.appBead = snapshot.val();
        }.bind(this));
    };
    BeadSimCmp.prototype.subscribeToLocationInfoBead = function () {
        firebase.database().ref('BeadRepo/LOCATION/').on('value', function (snapshot) {
            console.log(snapshot.val());
            this.locationBead = snapshot.val();
        }.bind(this));
    };
    BeadSimCmp.prototype.subscribeToAlertInfoBead = function () {
        firebase.database().ref('BeadRepo/ALERT/').on('value', function (snapshot) {
            console.log(snapshot.val());
            this.alertBead = snapshot.val();
            this.sendNotification();
        }.bind(this));
    };
    BeadSimCmp.prototype.sendNotification = function () {
        firebase.database().ref('web/selectedNotification').on('value', function (snapshot) {
            var notification = snapshot.val();
            this.fire(notification);
        }.bind(this));
    };
    BeadSimCmp.prototype.fire = function (notification) {
        firebase.database().ref('web/fire/').set(notification);
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
