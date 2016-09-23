import {
  Component,
  Inject,
  OnInit, NgModule
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

import {
  BeadSimService
} from '../services/bead-sim-service';

type Todo = {
  todoMessage: string;
  _id?: string;
}

declare var firebase: any;

@Component({
  selector: 'bead-sim-cmp',
  templateUrl: 'bead-sim/templates/bead-sim.html',
  styleUrls: ['bead-sim/styles/bead-sim.css']
})
export class BeadSimCmp implements OnInit {

  title:string = "Bead Simulation";

  constructor(private _beadSimService: BeadSimService) {

  }

  ngOnInit() {

  }


}
