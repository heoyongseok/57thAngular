import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LogiBusinessRoutingModule } from './logi-business-routing/logi-business-routing.module';
import { LogiPurchaseRoutingModule } from './logi-purchase-routing/logi-purchase-routing.module';
import { LogiProductionRoutingModule } from './logi-production-routing/logi-production-routing.module';
import { LogiDeliveryComponent } from 'src/app/logi-views/logi-business/logi-delivery-view/logi-delivery/logi-delivery.component';

const routes: Routes = [
  {path : 'logi/business/*', component : LogiBusinessRoutingModule},
  {path : 'logi/purchase/*', component : LogiPurchaseRoutingModule},
  {path : 'logi/production/*', component : LogiProductionRoutingModule},
  {path : 'logi/delivery', component : LogiDeliveryComponent}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes),LogiBusinessRoutingModule,LogiPurchaseRoutingModule,LogiProductionRoutingModule
  ],
  exports:[RouterModule]
})
export class LogiRoutingModule { }
