import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ReduxTestComponent } from 'src/app/sys-views/redux-test-view/redux-test/redux-test.component';
import { ReduxRoutingModule } from './redux-routing.module';


const routes: Routes = [
  {path : 'test/reduxtest', component : ReduxTestComponent}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes),ReduxRoutingModule
  ],
  exports:[RouterModule]
})
export class SysRoutingModule { }
