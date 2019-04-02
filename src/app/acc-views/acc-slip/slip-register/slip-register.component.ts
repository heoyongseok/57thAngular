import { Component, OnInit,ViewChild} from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { AccService } from 'src/app/common/svc/acc.service';



@Component({
  selector: 'slip-register',
  templateUrl: './slip-register.component.html',
  styleUrls: ['./slip-register.component.css']
})

export class SlipRegisterComponent extends AccService implements OnInit {
  @ViewChild('slipListGrid') slipListGrid: AgGridNg2;
  @ViewChild('journalListGrid') journalListGrid: AgGridNg2;
  @ViewChild('journalDetailGrid') journalDetailListGrid: AgGridNg2;

  a;
  today;
  gridApi;
  gridColumnApi;
  defaultColDef;
  rowSelection= "multiple";
  private dataArray = [];
  sequence;
  slipList = [];
  journalList =[];
  journalDetailList=[];
  journalDetailFormInfoList=[];
  events: string[] = [];
  status="미결";
  slipStatus=[ {value:'미결'},{value:'승인'}];

  columnDefs = [
    {headerName:'', 
     headerCheckboxSelection: true,
     headerCheckboxSelectionFilteredOnly: true,
     checkboxSelection: true,
     width: 100
     },
    {headerName: '전표일련번호', field: 'slipNo', editable: false},
    {headerName: '회계기수번호', field: 'accountPeriodNo' ,editable: false },
    {headerName: '결의부서명', field: 'deptCode' ,editable: false},
    {headerName: '전표유형', field: 'slipType'},
    {headerName: '품의내역', field: 'expenseReport'},
    {headerName: 'authorizationStatus', field: 'authorizationStatus', hide:true},
    {headerName: '작성자코드', field: 'reportingEmpCode' ,editable: false},
    {headerName: '작성날짜', field: 'reportingDate',  cellEditor: "datePicker"},
    {headerName: '승인자코드', field: 'approvalEmpCode',editable: false},
    {headerName: '승인날짜', field: 'approvalDate' ,editable: false},
    {headerName: 'slipDescription', field: 'slipDescription', hide:true},
    {headerName: '승인여부', field: 'slipStatus' ,editable: false}
];

columnDefss =[
  {headerName: '분개일련번호', field: 'journalNo',editable: false},
  {headerName: 'slipNo', field: 'slipNo', hide:true },
  {headerName: '대차구분', field: 'balanceDivision'},
  {headerName: '계정코드', field: 'accountInnerCode'},
  {headerName: '계정명', field: 'accountName'},
  {headerName: 'summaryNumber', field: 'summaryNumber', hide:true},
  {headerName: 'summaryComment', field: 'summaryComment', hide:true},
  {headerName: '거래처코드', field: 'customerCode'},
  {headerName: '거래처명', field: 'customerName'},
  {headerName: 'leftDebtorPrice', field: 'leftDebtorPrice', hide:true},
  {headerName: 'rightCreditsPrice', field: 'rightCreditsPrice', hide:true},
  {headerName: 'journalDescription', field: 'journalDescription', hide:true},
  {headerName: 'slipApprovalDate', field: 'slipApprovalDate', hide:true},
  {headerName: '금액', field: 'price'}
];

columnDefsss =[
  {headerName: '분개상세일련번호', field: 'journalDetailNo', hide:true},
  {headerName: '분개일련번호', field: 'journalNo', hide:true},
  {headerName: '상세항목', field: 'item' ,editable: false},
  {headerName: '상세항목내용', field: 'value'},
  {headerName: '계정과목', field: 'accountInnerCode', hide:true}
];

journalDetailNo
journalNo
item
value
accountInnerCode

  ngOnInit() {
    this.defaultColDef = { 
      resizable: true,
      editable: true,
     };
    this.Http();
    
  }


  Http(){
    this.today=this.createDate(new Date().toString());
    this.transaction("acc/slip/findSlipListByCondition.do","","startDate="+ this.today +" endDate="+ this.today +" slipStatus="+this.status).subscribe((result : any[])=>{
    this.dataArray = result;
    this.slipList=this.dataArray['sliplist'];
    });
      
  }

  onGridReady(params) {   //그리드 켜질때?
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;   
    params.api.sizeColumnsToFit(); 
    }

    slipGrid_onSelectionChanged(params) {   //전표그리드 클릭을 바꿀 때
      var selectedRows = params.api.getSelectedRows();
     // var selectedRowsString = selectedRows[0].slipNo;
      const selectedNodes = params.api.getSelectedNodes();
      const selectedId = selectedNodes.map( node => node.id);
      this.journalList=this.dataArray['sliplist'][selectedId].journalToList;
      params.api.redrawRows(); 
     // document.querySelector("#selectedRows").innerHTML = selectedRowsString;  
   
    }

    // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    //   this.events.push(`${type}: ${event.value}`);
    //   console.log(event.value);
    // }
    
    journalGrid_rowClicked(params){  //분개그리드 행선택할때
      console.log(params);
      var selectedRows = params.api.getSelectedRows();
      var jounrnalAccountInnerCode = selectedRows[0].accountInnerCode;
      var journalSelectedNodes = params.api.getSelectedNodes();
      console.log(journalSelectedNodes);
      var journalSelectedId = journalSelectedNodes.map( node => node.id);
     console.log(journalSelectedId);
      this.journalDetailList=this.journalList[journalSelectedId].journalDetailToList;
      
       if(this.journalDetailList.length!=0){
        document.getElementById("journalDetailGridDiv").style.visibility="visible";
       }
       else{
        document.getElementById("journalDetailGridDiv").style.visibility="none";
       }
      console.log(this.journalDetailList);
      
      this.createJournalDetailForm(jounrnalAccountInnerCode);
    }

    createJournalDetailForm(jounrnalAccountInnerCode){ //journaldetailform 가져오는 메서드
      this.transaction("acc/slip/findAccountControlDetailList.do","","accountCode="+jounrnalAccountInnerCode).subscribe((result : any[])=>{
       this.journalDetailFormInfoList=result;
       console.log(this.journalDetailFormInfoList);
      });
    }

    calDate;
    year;
    month;
    date;
    fromDate;
    endDate;
    model;
    model2;

    slipSearchBtn_click(model:string,model2:string){  //조회버튼 누르면
      alert(this.status);

      if(this.status=="승인"){
        //승인이면 못고치게 해야함 (여기로 들어는 와짐)
      }
      this.fromDate=this.createDate(model);
      this.endDate=this.createDate(model2);
   
      alert(this.fromDate+this.endDate);

      this.transaction("acc/slip/findSlipListByCondition.do","","startDate="+ this.fromDate +" endDate="+ this.endDate +" slipStatus="+this.status).subscribe((result : any[])=>{
        this.dataArray = result;
        //if(this.dataArray==undefined){alert("조회내용이 없습니다.");  this.journalList=[]; this.journalListGrid.api.redrawRows(); return; }
        this.slipList=this.dataArray['sliplist'];
        console.log(this.slipList);
        this.journalList=this.dataArray['sliplist'][0]['journalToList'];
        console.log(this.journalList);
        });
     }

    createDate(model){  //알파벳 영어 날짜 숫자날짜로 바꿔주는 함수 (ex - 20190327)
      this.calDate=new Date(model);
      this.year=this.calDate.getFullYear().toString();
      this.month=this.leadingZeros((parseInt(this.calDate.getMonth())+1).toString(),2);
      this.date=this.leadingZeros(this.calDate.getDate().toString(),2);
         
      return this.year+"-"+this.month+"-"+this.date;
    }

    leadingZeros(date, num) {   //0채워주는 함수
      var zero = '';
      date = date.toString();
     
      if (date.length < num) {
       for (var i = 0; i < num - date.length; i++)
        zero += '0';
      }
      return zero + date;
   }

   createSlipSequence(name){
   
    this.transaction("sys/findSequenceNo.do","","findSeq=SLIP_SEQ").subscribe((result : any[])=>{
        this.sequence= result['squenceNo'];
        if(name=="SLIP_SEQ"){
          this.slipAddBtn_click(this.sequence);
        }

    });


    }


   slipAddBtn_click(sequence){ 

       alert("dddd");
 
   var newData={chk: "0", status: "inserted", slipNo: sequence
              , accountPeriodNo:'BRC-01_02' , deptCode : 'DEP000',  authorizationStatus:""
              , reportingEmpCode:"EMP-04", reportingDate:this.createDate(new Date()),approvalEmpCode:"미결"
              , approvalDate: "미결",slipDescription:"",slipStatus:"미결" };
   this.slipList.push(newData);
   this.slipListGrid.api.setRowData(this.slipList);
   console.log(this.slipList); }

   
   slipDeleteBtn_click(){

     if(confirm("정말 삭제하시겠습니까?")==false){
           return;
     }

     console.log(this.slipListGrid);
     console.log(this.journalListGrid);
     var slipNodes= this.slipListGrid.api.getSelectedNodes();
     var slipDeleteList=[];
     slipNodes.forEach(element => {
   //   alert(element.rowIndex);
      this.slipList[element.rowIndex].status="deleted"
      slipDeleteList.push(this.slipList[element.rowIndex]);
    });
    
    this.slipBatchBtn_click(slipDeleteList);
    this.slipListGrid.api.redrawRows();
   // alert(this.agGrid.getRowClass);
  }



   slipBatchBtn_click(datas){
    var slipInfo=[]; 
    var journalInfo;
    var journalDetailInfo=[];
    var paramMap= new Map<string,string>();

   this.slipListGrid.rowData.forEach(element => {
   var slipGridStatus = element.status;
      if(slipGridStatus!="normal"){
       // console.log(element);
       slipInfo.push(element);
       journalInfo=element.journalToList;
       journalInfo.forEach(function(journal,index){ 
                journal.status=slipGridStatus;
                journal.journalDetailToList.forEach(function(journalDetail,index){
                  journalDetail.status=slipGridStatus;
                  journalDetailInfo.push(journalDetail);
          
                });
       
           });
      }

    }); 

  

    slipInfo.forEach(element=>{      //전표안에 분개는지우기 (가볍게)
         delete element.journalToList;
    });

    journalInfo.forEach(element=>{   //분개안에 분개상세는 지우기 (가볍게)
        delete element.journalDetailToList;
    });

    console.log(JSON.stringify(slipInfo));
    console.log(JSON.stringify(journalInfo));
    console.log(JSON.stringify(journalDetailInfo));
    

     var batchSlipData={};

     batchSlipData['slipInfo']=JSON.parse(JSON.stringify(slipInfo));
     batchSlipData['journalInfo']=JSON.parse(JSON.stringify(journalInfo));
     batchSlipData['journalDetailInfo']=JSON.parse(JSON.stringify(journalDetailInfo));

  this.transaction("acc/slip/batchSlipAndJournalAndJournalDetailInfo.do",JSON.stringify(batchSlipData),"").subscribe();
 }

 journalAddBtn_click(){}

 journalDeleteBtn_click(){}
   

}


// function getDatePicker() {
//   function Datepicker() {}
//   Datepicker.prototype.init = function(params) {
//     this.eInput = document.createElement("input");
//     this.eInput.value = params.value;
//     $(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
//   };
//   Datepicker.prototype.getGui = function() {
//     return this.eInput;
//   };
//   Datepicker.prototype.afterGuiAttached = function() {
//     this.eInput.focus();
//     this.eInput.select();
//   };
//   Datepicker.prototype.getValue = function() {
//     return this.eInput.value;
//   };
//   Datepicker.prototype.destroy = function() {};
//   Datepicker.prototype.isPopup = function() {
//     return false;
//   };
//   return Datepicker;
// }
