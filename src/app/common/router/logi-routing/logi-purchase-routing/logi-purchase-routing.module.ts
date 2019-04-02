import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReduxTestComponent } from 'src/app/sys-views/redux-test-view/redux-test/redux-test.component';
import { RoutingGuard } from '../../routing.guard';

const routes: Routes = [
  {path : 'logi/purchase/BOMForm', component : ReduxTestComponent,canActivate: [RoutingGuard]},
  {path : 'logi/purchase/WarehousingForm', component : ReduxTestComponent,canActivate: [RoutingGuard]},
  {path : 'logi/purchase/GiveOrderForm', component : ReduxTestComponent,canActivate: [RoutingGuard]},
  {path : 'logi/purchase/ItemForm', component : ReduxTestComponent,canActivate: [RoutingGuard]},
  {path : 'logi/purchase/InventoryForm', component : ReduxTestComponent,canActivate: [RoutingGuard]}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class LogiPurchaseRoutingModule { }
