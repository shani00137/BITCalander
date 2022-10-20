

import { FormBuilder } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpProvierService } from '../../../providers/http-provier.service';

import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';



import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSuperUser: string;
  list: any=[];
  TotalComplaints: any;
  solved: any;
  pending: any;
  todayComplaints: any;
  TotalTask: any;
  PendingTask: any;
  CompleteTask: any;
  InProgressTask: any;
  ideaList: any=[];
  pendingIdeas: number=0;
  Processing: number=0;
  Applicable: number=0;
  Rejected:number=0;
  notapplicable: any;
  TotalCount: any;
  constructor(private router: Router,private http: Http,private formBuilder: FormBuilder, private toastr: ToastrService,private myHttpservie:HttpProvierService, private spinner: NgxSpinnerService) 
  {
    
  }
  ngOnInit(): void {

    // this.isSuperUser= sessionStorage.getItem("userNo");
    this.getTopFigure();
  }
 
  getTopFigure() {

    this.pendingIdeas=0;
    this.ideaList=[];
    this.myHttpservie.getSimpleIdeas('',1,5,null).subscribe((Data) => {
      
      var obj=Data.json();
      this.ideaList = obj.Data;
      var info=obj.Info;
      if(info!=null)
      {
        this.pendingIdeas=info.Pending;
        this.Processing=info.Processing;
        this.Applicable=info.Applicable;
        this.notapplicable=info.NotApplicable;
        this.Rejected=info.Rejected;
        this.TotalCount=info.TotalCount;
      }
    
    
    }, error => { this.spinner.hide(), this.toastr.warning('Server Response...', error.statusText) });

  }
  getPercentage(value)
  {
    var percentage=value/this.TotalCount*100;
    return percentage;
  }

  

 
 
}
