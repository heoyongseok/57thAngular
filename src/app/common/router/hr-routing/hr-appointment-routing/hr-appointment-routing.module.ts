import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReduxTestComponent } from 'src/app/sys-views/redux-test-view/redux-test/redux-test.component';

 
 

const routes: Routes = [
  {path : 'hr/appointment/PersonalAppointmentForm', component : ReduxTestComponent},
  {path : 'hr/appointment/AppointmentForm', component : ReduxTestComponent}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class HrAppointmentRoutingModule { }
