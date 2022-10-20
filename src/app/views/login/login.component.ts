import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpProvierService } from '../../../providers/http-provier.service';

import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../providers/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {


  MenuList: any=[];
  navItems:any= [];
  message:string;
  itemForm: FormGroup;
  UpdatedappId:any;
  formModel:any={"userName":"","password":""};
 
  @ViewChild('myModal', {static: false}) public myModal: ModalDirective;
  usersInfo: any={};
  
  UserNo: any;
  userName: any;
  CreatedDate: any;
  ExpireDate: any;
  data:any=[];
  StoreId: any;
  Licence: any;
  constructor( private dataService: DataService,private router:Router, private formBuilder: FormBuilder, private toastr: ToastrService,private myHttpservie:HttpProvierService, private spinner: NgxSpinnerService)
   {
    this.itemForm = this.formBuilder.group({
      userName: [this.formModel.userName,[ Validators.required]],
      password: [this.formModel.password,[ Validators.required]],
      appId: [this.formModel.appId],
  });
 
}
ngOnInit(): void 
{
} 
onLogin()
{
  this.spinner.show();;
    this.itemForm.controls.appId.setValue(900001)
   
    this.myHttpservie.getLoginDetail(this.itemForm.value).subscribe(data=>{
      this.usersInfo=data.json();
        console.log(this.usersInfo)
        debugger;
        if(this.usersInfo.Success==false)
        {
          this.toastr.error("Alert","Wrong User Or Password")
        }  
        else
        {
          
          sessionStorage.setItem("UserNo",this.usersInfo.Data.User.UserID);
          sessionStorage.setItem("UserName",this.usersInfo.Data.User.UserName);
          sessionStorage.setItem("Token","bearer "+this.usersInfo.Data.Token);
          sessionStorage.setItem("UserPhoto", this.usersInfo.Data.User.UserPhoto)
          this.addMenu();
            // this.toastr.success(this.usersInfo.Data.User.UserName +'\n'+this.usersInfo.Data.User.Department,'Welcome.')
        }    
      this.spinner.hide();
   
    },error=>{this.spinner.hide(), this.toastr.warning("Server error",error._body)})
 
}
addMenu()
{
  this.navItems.push(
    {
      
      name: 'BIT Settings',
      url: 'BIT',
      icon:  'icon-settings',
      children:[{
        "name":'Settings',
        "icon":'icon-puzzle',
        'url':'/settings'
      }]
    },
    {
      
      name: 'BIT Ideas',
      url: 'BIT',
      icon:  'icon-cursor',
      children:[{
        "name":'Markazia Ideas',
        "icon":'icon-puzzle',
        'url':'/simpleideas'
      },{
        "name":'Kaizen Ideas',
        "icon":'icon-puzzle',
        'url':'/kaizanideas'
      }
    ]
    }
    );
    this.dataService.changeMessage(this.navItems);
    this.router.navigateByUrl('/dashboard');
}

}

