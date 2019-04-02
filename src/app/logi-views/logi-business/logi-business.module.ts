import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoMaterialModule } from 'src/app/common/shared/material.module';
import { LogiDeliveryComponent } from './logi-delivery-view/logi-delivery/logi-delivery.component';
import { ContractComponent } from './contract/contract.component';
import { EstimateComponent } from './estimate/estimate.component';

@NgModule({
  declarations: [LogiDeliveryComponent,ContractComponent,EstimateComponent],
  imports: [
    CommonModule,RouterModule,AgGridModule.withComponents([]),FormsModule,NgbModule,DemoMaterialModule
  ],
  exports:[LogiDeliveryComponent,ContractComponent,EstimateComponent]
})
export class LogiBusinessModule { }
