import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { TodoCmp }   from './todo/components/todo-cmp';
import { TodoService }   from './todo/services/todo-service';
import { routing, appRoutingProviders } from './app.routing';

import { BeadSimCmp } from './bead-sim/components/bead-sim-cmp';
import {BeadSimService} from "./bead-sim/services/bead-sim-service";

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
    ],
   declarations: [
      TodoCmp,
      BeadSimCmp,
    ],
    providers: [
      TodoService,
      BeadSimService,
      appRoutingProviders
    ],
    bootstrap: [
      TodoCmp,
    ],
})
export class AppModule {}
