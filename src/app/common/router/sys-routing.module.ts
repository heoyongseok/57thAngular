import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ReduxTestComponent } from 'src/app/sys-views/redux-test-view/redux-test/redux-test.component';
import { ReduxRoutingModule } from './redux-routing.module';
import { CustomerManageViewComponent } from 'src/app/sys-views/customer-manage-view/customer-manage-view.component';
import { CodeManageViewComponent } from 'src/app/sys-views/code-manage-view/code-manage-view.component';


const routes: Routes = [
  {path : 'sys/reduxtest', component : ReduxTestComponent},
  {path : 'sys/materialtest', component : CustomerManageViewComponent},
  {path : 'sys/codeManage', component : CodeManageViewComponent}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes),ReduxRoutingModule
  ],
  exports:[RouterModule]
})
export class SysRoutingModule { }
