import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from 'src/app/sys-views/main-view/login-form/login-form.component';
import { CodeManageViewComponent } from 'src/app/sys-views/code-manage-view/code-manage-view.component';
import { SysRoutingModule } from './sys-routing.module';


const routes: Routes = [
  {path : '', redirectTo: 'login-form', pathMatch:'full'},
  {path : 'login-form', component : LoginFormComponent},
  {path : 'sys', component : CodeManageViewComponent},
  {path : 'test/*', component : SysRoutingModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),SysRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
