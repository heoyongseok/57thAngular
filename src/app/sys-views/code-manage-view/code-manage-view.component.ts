import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { AgGridNg2 } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { SysService } from 'src/app/common/svc/sys.service';
import { AppStore } from 'src/app/common/redux/core/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/common/redux/core/app.state';

@Component({
  selector: 'app-code-manage-view',
  templateUrl: './code-manage-view.component.html',
  styleUrls: ['./code-manage-view.component.css']
})
export class CodeManageViewComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  title = 'angularTest';
  sysService:SysService;
  counter: number;
  constructor(public http:HttpClient, @Inject(AppStore) private store: Store<AppState>) {
    this.sysService=new SysService(http);
    alert("CodeManageViewComponent 의 constructor 진입");
    store.subscribe(() => this.readState());
    this.readState();
   }

  private dataArray = [];
  ngOnInit() {
    this.Http();
  }

  Http(){
    this.sysService.transaction("findCodeList.do","","a=HR01 b=HR02").subscribe((result : any[])=>{
    this.dataArray = result;
    console.log(this.dataArray);
    });
      
  }
ngDoCheck(){

}
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    console.log(selectedNodes);
    const selectedData = selectedNodes.map( node => node.data);
    console.log(JSON.stringify(selectedData));
   
}

onCellClick(params:any){
  const selectedNodes = this.agGrid.api.getSelectedNodes();
  const selectedData = selectedNodes.map( node => node.data);
alert(selectedNodes);
}

addRows(){
  var length=this.dataArray.length;
 // var newData:string;
  var newData={chk: "0", code: "test", codeDetailList: null, codeGroup: "test",  codeName: "test",  editStatus: "Y",  status: "inserted"};
  this.dataArray["codeList"].push(newData);
  this.agGrid.api.setRowData(this.dataArray["codeList"]);
  console.log(this.dataArray["codeList"]);
  
  }

  editRow(){
    this.dataArray["codeList"][0].status="updated";
    this.dataArray["codeList"][1].status="updated";
    this.agGrid.api.redrawRows();
  }

  getEditedData(){
   // console.log(this.agGrid.rowData);
   var batchData=[]; 
   this.agGrid.rowData.forEach(element => {
      //console.log(element);
      if(element.status!="normal"){
       // console.log(element);
        batchData.push(element);
      }
    });
    console.log(batchData);
    this.sysService.transaction("batchCode.do",JSON.stringify(batchData),"").subscribe();
  }

  deleteRow(){
    
    this.agGrid.api.getSelectedNodes().forEach(element => {
   //   alert(element.rowIndex);
      this.dataArray["codeList"][element.rowIndex].status="deleted"
    });
    this.agGrid.api.redrawRows();
   // alert(this.agGrid.getRowClass);
   
  }
getRowStyle = function(params) {
    if (params.data.status == 'updated') {
        return { background: 'blue' }
    }else if(params.data.status == 'deleted') {
      return { background: 'gray' }
  }else if(params.data.status == 'inserted') {
    return{ background: 'yellow' }
};
  }
  columnDefs = [
    {headerName: 'code', field: 'code', width: 80,checkboxSelection: true ,onCellClicked:params=>{this.onCellClick(params)}},
    {headerName: 'codeGroup', field: 'codeGroup'},
    {headerName: 'codeName', field: 'codeName', editable:true},
    {headerName: 'editStatus', field: 'editStatus'},
    {headerName: 'status', field: 'status'}
  ];
  readState() {
    alert("CodeManageViewComponent 의 readState 함수 작동");
    const state: AppState = this.store.getState() as AppState;
    this.counter = state.counter;
   
  }

}
