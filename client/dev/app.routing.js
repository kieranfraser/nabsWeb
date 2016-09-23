"use strict";
var router_1 = require('@angular/router');
var bead_sim_cmp_1 = require('./bead-sim/components/bead-sim-cmp');
var appRoutes = [
    { path: '', component: bead_sim_cmp_1.BeadSimCmp },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
