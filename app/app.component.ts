import { Component } from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';

import { HarvestFormComponent } from './forms/harvest.form.component';
import { ThingsComponent } from './things/things.component';
import { FarmComponent } from './farm/farm.component';
import { WhenComponent } from './when/when.component';
import { BundleWiseComponent } from './bundle-wise/bundle-wise.component';

import { ThingsService } from './things/things.service';
import { FirebaseService } from './things/firebase.service';

// Let TypeScript know about the special SystemJS __moduleName variable
declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, WhenComponent],
  providers: [ThingsService, FirebaseService],
})
@RouteConfig([
  {path: '/summary/...', name: 'Report', component: ThingsComponent, useAsDefault: true},
  {path: '/farm/...', name: 'Farm', component: FarmComponent },
//  { path: '/all', name: 'All', component: BundleWiseComponent},
])
export class AppComponent {
}
