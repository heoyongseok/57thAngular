import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  private url="http://localhost:8282/57thERP/";
  private dataArray = [];
  filterLev = {level : "1"};
  constructor(public http : HttpClient) { 
    // let result = this.filter.transform(this.dataArray, {level : "1"});
    // console.log(result);
  }

  ngOnInit() {
    this.findMenuList();
  }

  findMenuList(){
    this.http.get(this.url + "sys/findMenuList.do").subscribe((result : any[])=>{
      this.dataArray = result;
      console.log(this.dataArray);
    });
  }
}
