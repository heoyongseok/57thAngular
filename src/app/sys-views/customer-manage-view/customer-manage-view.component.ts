import { Component, OnInit } from '@angular/core';
import { SysService } from 'src/app/common/svc/sys.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-customer-manage-view',
  templateUrl: './customer-manage-view.component.html',
  styleUrls: ['./customer-manage-view.component.css']
})
export class CustomerManageViewComponent implements OnInit {
  businessCode:any[];
  deptCode:string;
  empno:string;
  pw:string;
  firstFormGroup:FormGroup
  constructor(private sysService:SysService) { }

  ngOnInit() {
  }
  sendVariable(){
    localStorage.setItem("pw",this.pw);
    this.sysService.transaction("test.do","","empno="+this.empno).subscribe()
  }
  submit(){
    console.log(this.firstFormGroup.value);
  }
}
