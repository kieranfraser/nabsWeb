import {ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { BeadSimCmp } from './bead-sim/components/bead-sim-cmp';

const appRoutes: Routes = [
  { path: '', component: BeadSimCmp },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
