import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogiService } from 'src/app/common/svc/logi.service';

@Component({
  selector: 'app-mrp-gathering-view',
  templateUrl: './mrp-gathering-view.component.html',
  styleUrls: ['./mrp-gathering-view.component.css']
})
export class MrpGatheringViewComponent implements OnInit {
  private logiService:LogiService;
  private http:HttpClient
  constructor(http:HttpClient) {
    this.http=http;
    this.logiService=new LogiService(this.http);
   }
  ngOnInit() {
    //this.findMrpG();
  }
public  mrpgList=[];
  findMrpG(){
    this.logiService.transaction("production/findMrpGatheringList.do","","gatheringStatus=N").subscribe((result : any[])=>{
    this.mrpgList=result["mrpGatheringList"];
    }); 

}
public mrpgColumnDefs = [
  {headerName: 'mrpGatheringNo', field: 'mrpGatheringNo'},
  {headerName: 'orderOrProductionStatus', field: 'orderOrProductionStatus'},
  {headerName: 'itemCode', field: 'itemCode'},
  {headerName: 'itemName', field: 'itemName'},
  {headerName: 'unitOfMrpGathering', field: 'unitOfMrpGathering'},
  {headerName: 'necessaryAmount', field: 'necessaryAmount'},
  {headerName: 'dueDate', field: 'dueDate'},
  {headerName: 'claimDate', field: 'claimDate'},
  {headerName: 'onGoingProcessStatus', field: 'onGoingProcessStatus'},
  {headerName: 'status', field: 'status'}
];

}
