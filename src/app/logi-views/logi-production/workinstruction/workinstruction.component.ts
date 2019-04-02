import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { AgGridNg2 } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';

import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { SysService } from 'src/app/common/svc/sys.service';
import { LogiService } from 'src/app/common/svc/logi.service';

@Component({
  selector: 'app-workinstruction',
  templateUrl: './workinstruction.component.html',
})

export class WorkinstructionComponent {
  @ViewChild('mrpGatheringGrid') mrpGatheringGrid: AgGridNg2;
  @ViewChild('workinstructionGrid') workinstructionGrid: AgGridNg2;
  

  title = 'workinstructionForm';
  logiService:LogiService;
  sysService:SysService
  counter: number;

  constructor(public http:HttpClient, calendar: NgbCalendar) {

    this.logiService=new LogiService(http);
 
   }
   
   private mrpGatheringList = [];
   ngOnInit() {
     this.Http();
   }
   
  Http(){
    this.logiService.transaction("production/findMrpGatheringList.do","","gatheringStatus=N").subscribe((result : any[])=>{
     
      this.mrpGatheringList = result['mrpGatheringList'];
  
    console.log(  this.mrpGatheringList);
    });
      
  }

  materialCheckTemp=[];

  public mrpGatheringNum;
  mrpGatheringGrid_clicked(param){

    this.mrpGatheringNum=param.data.mrpGatheringNo
    alert(this.mrpGatheringNum);
    this.logiService.transaction("production/findMaterialCheckTempList.do","","mrpGno="+this.mrpGatheringNum)
    .subscribe((result:any[])=>{
      console.log("dddddd");
      console.log(result['materialCheckList']);

      this.materialCheckTemp=result['materialCheckList'];
      this.Http();
     // console.log(result);
    });
   
  }

  saveBtn(){
    alert("하");
  }

   mrpGatheringColumnDefs = [
    {headerName: '소요량취합번호', field: 'mrpGatheringNo'},
    {headerName: '구매및생산여부', field: 'orderOrProductionStatus'},
    {headerName: '품목코드', field: 'itemCode'},
    {headerName: '품목명', field: 'itemName'},
    {headerName: '단위', field: 'unitOfMrpGathering'},
    {headerName: '필요수량', field: 'necessaryAmount'},
    {headerName: '납기일', field: 'dueDate'},
    {headerName: '지시일', field: 'claimDate'},
    {headerName: '공정진행여부', field: 'onGoingProcessStatus'}
  ];

  
  workInstructionColumnDefs = [
    {headerName: '작업지시번호', field: 'workInstructionNo'},
    {headerName: '소요량취합번호', field: 'mrpGatheringNo'},
    {headerName: '품목코드', field: 'itemCode'},
    {headerName: '품목명', field: 'itemName'},
    {headerName: '지시일자', field: 'instructionDate'},
    {headerName: '단위', field: 'unitOfWorkInstruction'},
    {headerName: '작업지시수량', field: 'workInstructionAmount'},
    {headerName: '생산완료상태', field: 'productionStatus'},
    {headerName: '설명', field: 'description'},
    {headerName: '합계액', field: 'workInstructionStatus'}

  ];

}
