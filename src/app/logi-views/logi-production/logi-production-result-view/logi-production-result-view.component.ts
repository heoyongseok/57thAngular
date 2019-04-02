import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogiService } from 'src/app/common/svc/logi.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
const datePipe = new DatePipe("en-US");
const toDay = datePipe.transform(new Date(), 'yyyyMMdd');
@Component({
  selector: 'app-logi-production-result-view',
  templateUrl: './logi-production-result-view.component.html',
  styleUrls: ['./logi-production-result-view.component.css'],
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})

export class LogiProductionResultViewComponent implements OnInit {
  @ViewChild('workInstruction_grid') agGrid: AgGridNg2;
  @ViewChild('prm_grid') agGrid2: AgGridNg2;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  logiService:LogiService;

  constructor(http:HttpClient) {
  this.logiService=new LogiService(http);
   }
private workInstructionArray=[];
private prmArray=[];
private fromDays: string;
private toDays: string;

workInstructionColumnDefs = [
  {headerName: 'workInstructionNo', field: 'workInstructionNo',checkboxSelection: true },
  {headerName: 'mrpGatheringNo', field: 'mrpGatheringNo'},
  {headerName: 'itemCode', field: 'itemCode'},
  {headerName: 'unitOfWorkInstruction', field: 'unitOfWorkInstruction'},
  {headerName: 'workInstructionAmount', field: 'workInstructionAmount'},
  {headerName: 'productionStatus', field: 'productionStatus'},
  {headerName: 'description', field: 'description'},
  {headerName: 'workInstructionStatus', field: 'workInstructionStatus'},
  {headerName: 'instructionDate', field: 'instructionDate'},
  {headerName: 'status', field: 'status'}
];
prmColumnDefs=[
  {headerName: 'productionResultNo', field: 'productionResultNo'},
  {headerName: 'workInstructionNo', field: 'workInstructionNo'},
  {headerName: 'productionDate', field: 'productionDate'},
  {headerName: 'productionAmount', field: 'productionAmount'},
  {headerName: 'itemCode', field: 'itemCode'},
  {headerName: 'itemName', field: 'itemName'},
  {headerName: 'unitOfProductionResult', field: 'unitOfProductionResult'},
  {headerName: 'description', field: 'description'},
  {headerName: 'status', field: 'status'}
];

  ngOnInit() {
    this.findWorkInstruction();
   
  }
  findWorkInstruction(){
    this.logiService.transaction("production/findWorkInstructionList2.do","","").subscribe((result : any[])=>{
      this.workInstructionArray = result;
      console.log(this.workInstructionArray);
      this.agGrid.api.redrawRows();
      });
  }
  registPrm(){

    const selectedNodes = this.agGrid.api.getSelectedNodes();
    console.log(selectedNodes);
    const selectedData = selectedNodes.map( node => node.data);
    console.log(JSON.stringify(selectedData[0]["workInstructionNo"]));
    this.logiService.transaction("production/registPrm.do",JSON.stringify(selectedData),"deptCode=dpt01 empCode=1111 reportingDate=20190326 businessCode=brc-01").subscribe(()=>{
  
    this.findWorkInstruction();
    this.getTodayPrm();
    });
  }
  getTodayPrm(){

    this.logiService.transaction("production/findPrmList.do","","fromDate="+toDay+" toDate="+toDay).subscribe((result : any[])=>{
    this.prmArray = result;
    console.log(this.prmArray);
    this.agGrid2.api.redrawRows();
    });
  }

  
  findPrm(){
    var fromYear=String(this.fromDate.year);
    var fromMonth=this.getFormatDate(String(this.fromDate.month));
    var fromDay=this.getFormatDate(String(this.fromDate.day));
    
    this.fromDays=fromYear+fromMonth+fromDay;
    
    var toYear=String(this.toDate.year);
    var toMonth=this.getFormatDate(String(this.toDate.month));
    var toDay=this.getFormatDate(String(this.toDate.day));

    this.toDays=toYear+toMonth+toDay;

    this.logiService.transaction("production/findPrmList.do","","fromDate="+this.fromDays+" toDate="+this.toDays).subscribe((result : any[])=>{
      this.prmArray = result;
      console.log(this.prmArray);
      this.agGrid2.api.redrawRows();
      });
  }

  getFormatDate(monthday){
    monthday = monthday >= 10 ? monthday : '0' + monthday;
    return  monthday;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    console.log(this.fromDate);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {

    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  
  }
}