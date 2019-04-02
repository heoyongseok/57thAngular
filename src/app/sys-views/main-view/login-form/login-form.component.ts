import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { SysService } from 'src/app/common/svc/sys.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridNg2;

  title = 'angularTest';
  placeCode :string = '';
  deptCode :string = '';
  display='none';

  constructor(public http : HttpClient,public sysService:SysService) { }

  private dataArray = [];
  ngOnInit() {
   this.resetForm();
   //this.findPlaceCode();
  }
  resetForm(form? : NgForm){
    //form.reset();
      } 

  findPlaceCode(){
    this.sysService.transaction("findBusinessPlaceList.do","","").subscribe((result : any[])=>{
      this.dataArray = result;
      console.log(this.dataArray);
    });
  }
  businessColumnDefs = [
    {headerName: 'businessPlaceCode', field: 'businessPlaceCode', 
    width: 200, onCellDoubleClicked:params=>{this.businessPlaceCodeSetValue(params);}},
    {headerName: 'businessPlaceName', field: 'businessPlaceName', 
    width: 200, onCellDoubleClicked:params=>{this.businessPlaceCodeSetValue(params);}}
  ];

  findDeptCode(){
   // alert("aaaaa");
    this.sysService.transaction("findAllDeptList.do","","")
    .subscribe((result : any[])=>{
      this.dataArray = result;
      console.log(this.dataArray);
    });
  }
    deptColumnDefs = [
      {headerName: 'deptCode', field: 'deptCode', 
      width: 200, onCellDoubleClicked:params2=>{this.deptCodeSetValue(params2);}},
      {headerName: 'deptName', field: 'deptName', 
      width: 200, onCellDoubleClicked:params2=>{this.deptCodeSetValue(params2);}}
    ];
  login(){
    alert("aaaaa")
    location.replace("");
  }
    showModalFunc(){
    
  }
    businessPlaceCodeSetValue(params){
    alert(params.data.businessPlaceCode);
    this.placeCode=params.data.businessPlaceCode;
    //this.display='none';
  }
    deptCodeSetValue(params2){
    alert(params2.data.deptCode);
    this.deptCode=params2.data.deptCode;
    //this.display='none';
    }
  }
  //[(ngModel)]="placeCode" #pCode="ngModel"