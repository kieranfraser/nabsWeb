import {ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { BeadSimCmp } from './bead-sim/components/bead-sim-cmp';
import {ExploreCmp} from "./explore/components/explore-cmp";

const appRoutes: Routes = [
  { path: '', component: ExploreCmp },
  { path: 'bead-simulation', component: BeadSimCmp },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
