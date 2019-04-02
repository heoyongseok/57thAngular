import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ReduxRoutingModule } from './redux-routing.module';
import { LogiModule } from 'src/app/logi-views/logi.module';
import { LogiDeliveryComponent } from 'src/app/logi-views/logi-business/logi-delivery-view/logi-delivery/logi-delivery.component';


const routes: Routes = [
  {path : 'logi/delivery', component : LogiDeliveryComponent}

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes),ReduxRoutingModule,LogiModule
  ],
  exports:[RouterModule]
})
export class LogiRoutingModule { }
