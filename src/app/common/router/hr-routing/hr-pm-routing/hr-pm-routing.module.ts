import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReduxTestComponent } from 'src/app/sys-views/redux-test-view/redux-test/redux-test.component';
import { RoutingGuard } from '../../routing.guard';


 

const routes: Routes = [
  {path : 'hr/pm/HmRcdCd', component : ReduxTestComponent,canActivate: [RoutingGuard]},
  {path : 'hr/pm/HmIfmElm', component : ReduxTestComponent,canActivate: [RoutingGuard]}

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class HrPmRoutingModule { }
