import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccStatementRoutingModule } from './acc-statement-routing/acc-statement-routing.module';
import { AccBookMgtRoutingModule } from './acc-book-mgt-routing/acc-book-mgt-routing.module';
import { SlipRegisterComponent } from 'src/app/acc-views/acc-slip/slip-register/slip-register.component';
import { RoutingGuard } from '../routing.guard';

const routes: Routes = [
  {path : 'acc/statement/*', component : AccStatementRoutingModule,canActivate: [RoutingGuard]},
  {path : 'acc/slip', component : SlipRegisterComponent,canActivate: [RoutingGuard]},
  {path : 'acc/accBookMgt/*', component : AccBookMgtRoutingModule,canActivate: [RoutingGuard]}
]
@NgModule({
    declarations: [],
    imports: [
      CommonModule,RouterModule.forRoot(routes),AccStatementRoutingModule,AccBookMgtRoutingModule
    ],
    exports:[RouterModule]
  })
export class AccRoutingModule { }
