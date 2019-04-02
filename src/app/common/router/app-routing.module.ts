import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from 'src/app/sys-views/main-view/login-form/login-form.component';


import { AccRoutingModule } from './acc-routing/acc-routing.module';
import { SysRoutingModule } from './sys-routing/sys-routing.module';

import { HrRoutingModule } from './hr-routing/hr-routing.module';
import { ReduxTestComponent } from 'src/app/sys-views/redux-test-view/redux-test/redux-test.component';
import { LogiRoutingModule } from './logi-routing/logi-routing.module';
import { RoutingGuard } from './routing.guard';

const routes: Routes = [
  {path : '', redirectTo: 'login-form', pathMatch:'full'},
  {path : 'login-form', component : LoginFormComponent},
  {path : 'main', component : LoginFormComponent},
  {path : 'redux', component : ReduxTestComponent},
  {path : 'sys/*', component : SysRoutingModule,  canActivate: [RoutingGuard]},
  {path : 'hr/*', component : HrRoutingModule,  canActivate: [RoutingGuard]},
  {path : 'logi/*', component : LogiRoutingModule,  canActivate: [RoutingGuard]},
  {path : 'acc/*', component : AccRoutingModule,  canActivate: [RoutingGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),SysRoutingModule,LogiRoutingModule,AccRoutingModule,HrRoutingModule],
  exports: [RouterModule]

})
export class AppRoutingModule { }
