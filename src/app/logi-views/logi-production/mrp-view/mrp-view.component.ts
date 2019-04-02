import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';

import { LogiService } from 'src/app/common/svc/logi.service';
import { HttpClient } from '@angular/common/http';
import { MrpGatheringViewComponent } from './mrp-gathering-view/mrp-gathering-view.component';

@Component({
  selector: 'app-mrp-view',
  templateUrl: './mrp-view.component.html',
  styleUrls: ['./mrp-view.component.css']
})

export class MrpViewComponent implements OnInit {
  @ViewChild('mpsGrid') mpsGrid: AgGridNg2;
  @ViewChild('mrpGrid') mrpGrid: AgGridNg2;
  @ViewChild(MrpGatheringViewComponent) mrpgComponent: MrpGatheringViewComponent;//자식컴포넌트의 주소값획득법
  private logiService:LogiService;
  private http:HttpClient;
  constructor(http:HttpClient) {
    this.http=http;
    this.logiService=new LogiService(this.http);

   }
mpsList=[];
mrpList=[];
  ngOnInit() {
    this.findMps();
    this.findMrp();
  }
  findMps(){
    this.logiService.transaction("production/findMpsList.do","","fromDate=mrpSelect toDate=0").subscribe((result : any[])=>{
    this.mpsList=result["mpsList"];
    });
  }
  mpsColumnDefs = [
    {headerName: 'mpsNo', field: 'mpsNo', checkboxSelection: true },
    {headerName: 'mpsPlanClassification', field: 'mpsPlanClassification'},
    
    {headerName: 'itemCode', field: 'itemCode'},
    {headerName: 'itemName', field: 'itemName'},
  
    {headerName: 'contractDetailNo', field: 'contractDetailNo'},
    {headerName: 'salesPlanNo', field: 'salesPlanNo'},
    {headerName: 'unitPriceOfContract', field: 'unitPriceOfContract'},
    {headerName: 'unitOfMps', field: 'unitOfMps'},
    {headerName: 'mpsPlanDate', field: 'mpsPlanDate'},
    {headerName: 'mpsPlanAmount', field: 'mpsPlanAmount'},
    {headerName: 'dueDateOfMps', field: 'dueDateOfMps'},
    {headerName: 'scheduledEndDate', field: 'scheduledEndDate'},
    {headerName: 'mrpApplyStatus', field: 'mrpApplyStatus'},
    {headerName: 'description', field: 'description'},
    {headerName: 'status', field: 'status'}
  ];
  mrpColumnDefs = [
    {headerName: 'mrpNo', field: 'mrpNo'},
    {headerName: 'mpsNo', field: 'mpsNo'},
    {headerName: 'mrpGatheringStatus', field: 'mrpGatheringStatus'},
    {headerName: 'mrpGatheringNo', field: 'mrpGatheringNo'},
    {headerName: 'itemCode', field: 'itemCode'},
    {headerName: 'itemName', field: 'itemName'},
    {headerName: 'itemClassifcation', field: 'itemClassifcation'},
    {headerName: 'unitOfMrp', field: 'unitOfMrp'},
    {headerName: 'requiredAmount', field: 'requiredAmount'},
    {headerName: 'orderDate', field: 'orderDate'},
    {headerName: 'requiredDate', field: 'requiredDate'},
    {headerName: 'status', field: 'status'}
  ];
  registMrp(){
    const selectedNodes = this.mpsGrid.api.getSelectedNodes();
    console.log(selectedNodes);
    const selectedData = selectedNodes.map( node => node.data);
    console.log(JSON.stringify(selectedData));

    this.logiService.transaction("production/findMrpOpenTempList.do",JSON.stringify(selectedData),"").subscribe((result : any[])=>{
    //this.mrpList=result["mrpOpenTempList"];
    this.findMps();
    this.findMrp();
    });
  }
  findMrp(){
    this.logiService.transaction("production/findMrpList.do","","mrpgStatus=NO").subscribe((result : any[])=>{
    this.mrpList=result["mrpList"];
    }); 

  }
  registMrpG(){
    var batchData=[]; 
    this.mrpGrid.rowData.forEach(element => {
       //console.log(element);
       if(element.mrpGatheringStatus!="Y"){
        // console.log(element);
         batchData.push(element);
       }
     });
     console.log(batchData);
    this.logiService.transaction("production/registMrpGathering.do",JSON.stringify(batchData),"").subscribe((result : any[])=>{
      this.findMrp();
      this.mrpgComponent.findMrpG();
      }); 

  }
}
