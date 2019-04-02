import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReduxTestComponent } from 'src/app/sys-views/redux-test-view/redux-test/redux-test.component';

 
 

const routes: Routes = [
  {path : 'acc/accBookMgt/journalForm', component : ReduxTestComponent},
  {path : 'acc/accBookMgt/accountant', component : ReduxTestComponent}
]
@NgModule({
    declarations: [],
    imports: [
      CommonModule,RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
  })
export class AccBookMgtRoutingModule { }
