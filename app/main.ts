import { bootstrap }    from 'angular2/platform/browser';
import { enableProdMode } from 'angular2/core';
import { AppComponent } from './app.component';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';

//IMPORTANT TBD 2/5 - required for dev testing? uncomment in production?!
enableProdMode();

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
