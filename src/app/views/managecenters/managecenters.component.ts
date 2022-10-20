import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpProvierService } from '../../../providers/http-provier.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ElementRef } from '@angular/core';
import { DataService } from '../../../providers/data.service';

@Component({
  selector: 'app-managecenters',
  templateUrl: './managecenters.component.html',
  styleUrls: ['./managecenters.component.scss']
})
export class ManagecentersComponent implements OnInit {
  SearchMD:any={};
  serviceCenterList: any=[];
  itemForm: FormGroup;
  myInputVariable: ElementRef;
  accountInfo:any={"EndofWorkingDay":new Date(),"BreakStartTime":new Date()};
  @ViewChild('myModal', {static: false}) public myModal: ModalDirective;
  lookupList: any=[];
  ImagesList: any;
  constructor(private dataservice: DataService, private formBuilder: FormBuilder, private toastr: ToastrService,private myHttpservie:HttpProvierService, private spinner: NgxSpinnerService) 
  {
    this.SearchMD.searchText="";
   
    
     this.itemForm = this.formBuilder.group({
      ServiceCenterName: [this.accountInfo.ServiceCenterName,[ Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      Mobile1: [this.accountInfo.Mobile1],
      Mobile2: [this.accountInfo.Mobile2],
      Email: [this.accountInfo.Email],
      BreakStartTime: [this.accountInfo.BreakStartTime],
      EndofWorkingDay: [this.accountInfo.EndofWorkingDay,[ Validators.required]],
      Logo: [this.accountInfo.Logo],
      CatagoryId: [this.accountInfo.CatagoryId],
      ServiceCenterId:[this.accountInfo.ServiceCenterId],
      Description:[this.accountInfo.Description]
   });
    
  }

  ngOnInit(): void {
    this.getAllServiceCenters();
    this.getLookUp();
  }
  getAllServiceCenters() {
  
    this.spinner.show();
    this.serviceCenterList=[];
    this.myHttpservie.SC_GetServiceCentersABC().subscribe((Data) => {
      var data=Data.json() ;
      this.serviceCenterList =data.Data;
      this.spinner.hide();
    }, error => { this.spinner.hide(), this.toastr.warning('Server not Response...', 'Please Refresh!') });
  }
  getLookUp() {
  
    this.spinner.show();
    this.lookupList=[];
    this.myHttpservie.SC_GetAppintmentLookupChild().subscribe((Data) => {
      var data=Data.json() ;
      this.lookupList =data.Data.Result;
      this.spinner.hide();
    }, error => { this.spinner.hide(), this.toastr.warning('Server not Response...', 'Please Refresh!') });
  }
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
       
      const file = event.target.files[0];
      this.ImagesList=file;
    }
  }
  create()
  {

  }
  save()
  {
    if(this.itemForm.valid)
    {
      debugger;
      const formData: FormData = new FormData();       
      formData.append('Images', this.ImagesList, this.ImagesList.name); 
      formData.append('ServiceCenterName',this.itemForm.controls.ServiceCenterName.value);
      formData.append('Mobile1',this.itemForm.controls.Mobile1.value);
      formData.append('Mobile1',this.itemForm.controls.Mobile1.value);
      formData.append('Email',this.itemForm.controls.Email.value);
      formData.append('Description',this.itemForm.controls.Description.value);
      formData.append('BreakStartTime',"0");
      formData.append('EndofWorkingDay',"0");
       formData.append('CategoryId',this.itemForm.controls.CatagoryId.value);
      formData.append('ServiceCenterId',"0");
      formData.append('BreakTimeStatus',"true");
      formData.append('BusnissAreaId',"0");
      formData.append('DepartmentId',"0");
      formData.append('BranchId',"0");
      formData.append('NoOfServices',"0");
      formData.append('EndofWorkingDayStatus',"0");      
      formData.append('Is_Active',"true");
      formData.append('Logo',this.itemForm.controls.Logo.value);
      this.spinner.show();   
        this.myHttpservie.SC_SaveServiceCenters(formData).subscribe((Data) => {         
          this.toastr.success("Successfully","Response");
          this.spinner.hide();
          this.itemForm.reset();
          this.myModal.hide(); 
          this.getAllServiceCenters();
          this.myInputVariable.nativeElement.value = "";     
    
        }, error => { this.spinner.hide(),  this.dataservice.showError(error) }); 
      
    }
    else{
      Object.keys(this.itemForm.controls).forEach(field => {
        const control = this.itemForm.get(field);
        control.markAsTouched({ onlySelf: true });
       });
    }
  }
  Reset(){this.itemForm.reset()}

}
