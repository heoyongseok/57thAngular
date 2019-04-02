import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogiService } from 'src/app/common/svc/logi.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { dataStore } from 'src/app/common/redux/core/code.store';
import { Store } from 'redux';
import { dataState } from 'src/app/common/redux/core/code.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mps-view',
  templateUrl: './mps-view.component.html',
  styleUrls: ['./mps-view.component.css']
})
export class MpsViewComponent implements OnInit {
  @ViewChild('contractGrd') contractGrd: AgGridNg2;

  private logiService:LogiService;
  private http:HttpClient;
  private contractArray=[];
  private stockArray=[];
  private router:Router;
  constructor(http:HttpClient,@Inject(dataStore) public store: Store<dataState>,router:Router) {
    store.subscribe(() => this.readState());
    this.http=http;
    this.logiService=new LogiService(this.http);
    this.router=router;
   }

  ngOnInit() {
    this.findMps();
    this.readState()
  }
  readState(){
    this.stockArray = this.store.getState().code["stockList"];
  }

 contractColumnDefs = [
  {headerName: '수주상세번호', field: 'contractDetailNo', checkboxSelection: true },
  {headerName: '수주번호', field: 'contractNo'},
  
  {headerName: '품명', field: 'itemCode'},
  {headerName: '품목코드', field: 'itemName'},

  {headerName: '수주수량', field: 'contractAmount'},
  {headerName: '단위', field: 'unitOfContract'},
  {headerName: '단위가격', field: 'unitPriceOfContract'},
  {headerName: 'mps적용상태', field: 'mpsApplyStatus'},
  {headerName: '납품상태', field: 'deliveryStatus'},
  {headerName: '비고', field: 'description',hide:true},
  {headerName: '납품잔량', field: 'deliveryRemain',hide:true},
  {headerName: '전표등록', field: 'slipRegistStatus',hide:true},

  {headerName: 'status', field: 'status',hide:true}
];
  findMps(){
    this.logiService.transaction("business/findRangedContractDetailList.do","","fromDate=mpsSelect toDate=0").subscribe((result : any[])=>{
      this.contractArray = result;
      console.log(this.contractArray);
       
      });
  }
  contractGrd_onRowClick(params){
    this.stockArray.forEach(element => {
      //console.log(element);
      if(element.itemCode==params.data.itemCode){
    //  alert(element.stockAmount-element.safetyAllowanceAmount-params.data.contractAmount);

        if(element.stockAmount-element.safetyAllowanceAmount-params.data.contractAmount>=0){
          if(confirm("재고가있습니다. 납품페이지로 이동하시겠습니까?")){
            //this.router.navigate(['logi/business/DeliveryForm']);
            this.router.navigateByUrl('logi/business/DeliveryForm');
          };
        }
      }
    });

  }
  registMps() {
    const selectedNodes = this.contractGrd.api.getSelectedNodes();
    console.log(selectedNodes);
    const selectedData = selectedNodes.map( node => node.data);
    console.log(JSON.stringify(selectedData));

    this.logiService.transaction("production/registerMps.do",JSON.stringify(selectedData),"").subscribe(()=>{
      alert("mps가 등록되었습니다");
      this.findMps();}
    );
  }

}
