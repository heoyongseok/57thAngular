import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeManageViewComponent } from './code-manage-view/code-manage-view.component';
import { CustomerManageViewComponent } from './customer-manage-view/customer-manage-view.component';
import { MenuTreeComponent } from './main-view/menu-tree/menu-tree.component';
import { LoginFormComponent } from './main-view/login-form/login-form.component';

import { TopComponent } from './main-view/top/top.component';
import { FooterComponent } from './main-view/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../common/shared/material.module';
import { ReduxTestComponent } from './redux-test-view/redux-test/redux-test.component';

const CORE_COMPONENTS = [ReduxTestComponent,CodeManageViewComponent,CustomerManageViewComponent,MenuTreeComponent,LoginFormComponent,TopComponent,FooterComponent]


@NgModule({
  declarations: [CodeManageViewComponent, CustomerManageViewComponent
    ,MenuTreeComponent,LoginFormComponent
    ,TopComponent, FooterComponent
    , ReduxTestComponent,ReduxTestComponent],
  imports: [
    CommonModule,RouterModule,AgGridModule.withComponents([]),FormsModule,NgbModule,DemoMaterialModule
  ],
  exports: CORE_COMPONENTS
})
export class SysModule { }
