import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpProvierService } from '../../../providers/http-provier.service';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/map';

import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../providers/data.service';
import { ConfirmedValidator } from '../../../providers/ConfirmPasswordValidator';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  listData: any[];
  rolemodel:any={};

  isRegister:boolean=false;
  welcomeMessage;any;
  itemForm: FormGroup;
  UpdatedRoleId:any;
  formModel:any={"PIN":"","CNIC":"","ConfirmPIN":"","SAPCode":"","Ipaddress":"","Macaddress":""};
 
  @ViewChild('myModal', {static: false}) public myModal: ModalDirective;
  usersInfo: any=[];
 
  accountInfo:any={"Email":"","UserName":""};
  UpdateModel:any;
  
  UpdatedId: any;
  message: any;
  cnic: any;
  constructor( private dataService: DataService,private router:Router, private formBuilder: FormBuilder, private toastr: ToastrService,private myHttpservie:HttpProvierService, private spinner: NgxSpinnerService)
  {
   this.itemForm = this.formBuilder.group({
    SAPCode: [this.formModel.SAPCode,[ Validators.required]],
    PIN: [this.formModel.PIN,[ Validators.required]],
    ConfirmPIN: [this.formModel.ConfirmPIN,[ Validators.required]],
    CNIC: [this.formModel.CNIC,[ Validators.required, Validators.minLength(4)]],
    
 },

 {validator: this.passwordMatchValidator}
);
 }
 passwordMatchValidator(frm: FormGroup) {
  return frm.controls['ConfirmPIN'].value === frm.controls['PIN'].value ? null : {'mismatch': true};
}
  ngOnInit() {
  }

   onResetPassword()
   {
      debugger;
         this.spinner.show();
         this.formModel=this.itemForm.value;
 
          this.myHttpservie.resetPassword(this.formModel).subscribe((data) => {
         this.usersInfo= data.json();
         debugger;
         if(this.usersInfo[0]=="True")
         {
            this.itemForm.reset();
            this.toastr.success(this.usersInfo[1], 'Response!');
            this.router.navigateByUrl('/login')
         }
         else
         {
            this.toastr.error(this.usersInfo[1], 'Response!');
         }
                   
        this.spinner.hide();
      }, error => { this.spinner.hide(), this.toastr.warning('Server not Response...', 'Please Refresh!') });

   }

}
