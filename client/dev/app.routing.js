"use strict";
var router_1 = require('@angular/router');
var bead_sim_cmp_1 = require('./bead-sim/components/bead-sim-cmp');
var explore_cmp_1 = require("./explore/components/explore-cmp");
var appRoutes = [
    { path: '', component: explore_cmp_1.ExploreCmp },
    { path: 'bead-simulation', component: bead_sim_cmp_1.BeadSimCmp },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
