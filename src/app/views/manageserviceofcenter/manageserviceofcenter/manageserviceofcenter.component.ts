import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpProvierService } from '../../../../providers/http-provier.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ElementRef } from '@angular/core';
import { DataService } from '../../../../providers/data.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-manageserviceofcenter',
  templateUrl: './manageserviceofcenter.component.html',
  styleUrls: ['./manageserviceofcenter.component.scss']
})
export class ManageserviceofcenterComponent implements OnInit {

  SearchMD:any={};
  serviceList: any=[];
  itemForm: FormGroup;
  myInputVariable: ElementRef;
  accountInfo:any={};
  @ViewChild('myModal', {static: false}) public myModal: ModalDirective;
  lookupList: any=[];
  ImagesList: any;
  selectedLookupID:any;
  CenterList: any=[];
  updatedId: number;
  selectedCenterMD:any={};
  constructor(private dataservice: DataService, private formBuilder: FormBuilder, private toastr: ToastrService,private myHttpservie:HttpProvierService, private spinner: NgxSpinnerService) 
  {
    this.itemForm = this.formBuilder.group({
     
      RecordId: [this.accountInfo.RecordId],
      CenterId: [this.accountInfo.CenterId,[ Validators.required]],
      ServiceTypeId: [this.accountInfo.ServiceTypeId,[ Validators.required]],
      ServiceId: [this.accountInfo.ServiceId,[ Validators.required]],
      IsDeleted: [this.accountInfo.IsDeleted],
      LocationsCount: [this.accountInfo.LocationsCount,[ Validators.required]],
      IsActive: [this.accountInfo.IsActive],
      FloorsCount:[this.accountInfo.FloorsCount,[ Validators.required]],
     
   });
  }

  ngOnInit(): void {
    this.getCenterServices();
    this.getAllCenters();
    this.getServiceLookUp();
    
  
  }
  getCenterServices() {
    debugger;
    this.spinner.show();
    this.serviceList=[]; 
    var CenterId=this.selectedCenterMD;
    var ServiceTypeId=this.selectedLookupID;
    if(CenterId==null)
    {
      CenterId="";
    }
    if(ServiceTypeId==null)
    {
      ServiceTypeId="";
    }
    this.myHttpservie.SC_GetServicesofCenters(ServiceTypeId,CenterId).subscribe((Data) => {
      var data=Data.json() ;
      this.serviceList =data.Data;
      console.log(this.serviceList);
      this.spinner.hide();
    }, error => { this.spinner.hide(), this.toastr.warning('Server not Response...', 'Please Refresh!') });
  }
  getAllCenters() {
  
    this.spinner.show();
    this.CenterList=[];
    this.myHttpservie.SC_GetServiceCentersABC().subscribe((Data) => {
      var data=Data.json() ;
      this.CenterList =data.Data;
      this.spinner.hide();
    }, error => { this.spinner.hide(), this.toastr.warning('Server not Response...', 'Please Refresh!') });
  }
  getServiceLookUp() {
  
    this.spinner.show();
    this.lookupList=[];
    this.myHttpservie.getAllLookByTypeId(3).subscribe((Data) => {
      var data=Data.json() ;
      this.lookupList =data.Data.Result;
      this.spinner.hide();
    }, error => { this.spinner.hide(), this.toastr.warning('Server not Response...', 'Please Refresh!') });
  }
  getServices(typeId) {
  
    this.spinner.show();
    this.serviceList=[];
    var ServiceTypeId=typeId;
    this.myHttpservie.SC_GetServices(ServiceTypeId).subscribe((Data) => {
      var data=Data.json() ;
      this.serviceList =data.Data;
      this.spinner.hide();
    }, error => { this.spinner.hide(), this.toastr.warning('Server not Response...', 'Please Refresh!') });
  }
  onChangeServiceType($event)
  {
    // debugger;
    // this.getServices($event.CodeId)
  }
  save()
  {
    if(this.updatedId==0)
    {
      if(this.itemForm.valid)
      {
        debugger;
        const formData: FormData = new FormData();        
        this.itemForm.controls.IsActive.setValue(true);
        this.itemForm.controls.RecordId.setValue(0);
        this.itemForm.controls.IsDeleted.setValue(false);
        formData.append('RecordId',this.itemForm.controls.RecordId.value);
        formData.append('CenterId',this.itemForm.controls.CenterId.value);
        formData.append('ServiceTypeId',this.itemForm.controls.ServiceTypeId.value);
        formData.append('ServiceId',this.itemForm.controls.ServiceId.value);
       formData.append('ServiceLogo','no');
        formData.append('IsDeleted',this.itemForm.controls.IsDeleted.value);   
        formData.append('LocationsCount',this.itemForm.controls.LocationsCount.value);   
        formData.append('FloorsCount',this.itemForm.controls.FloorsCount.value);  
        formData.append('IsActive',this.itemForm.controls.IsActive.value);     
        this.spinner.show();   
          this.myHttpservie.SC_SaveServicesofCenters(formData).subscribe((Data) => {         
            this.toastr.success("Successfully","Response");
            this.spinner.hide();
            this.itemForm.reset();
            this.myModal.hide(); 
            this.getCenterServices();
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
    else
    {
      if(this.itemForm.valid)
      {
        debugger;
        const formData: FormData = new FormData();       
     
        this.itemForm.controls.IsDeleted.setValue(false);
        formData.append('RecordId',this.itemForm.controls.RecordId.value);
        formData.append('CenterId',this.itemForm.controls.CenterId.value);
        formData.append('ServiceTypeId',this.itemForm.controls.ServiceTypeId.value);
        formData.append('ServiceId',this.itemForm.controls.ServiceId.value);
       formData.append('ServiceLogo','no');
        formData.append('IsDeleted',this.itemForm.controls.IsDeleted.value);   
        formData.append('LocationsCount',this.itemForm.controls.LocationsCount.value);   
        formData.append('FloorsCount',this.itemForm.controls.FloorsCount.value);  
        formData.append('IsActive',this.itemForm.controls.IsActive.value);     
        this.spinner.show();   
          this.myHttpservie.SC_SaveServicesofCenters(formData).subscribe((Data) => {         
            this.toastr.success("Successfully","Response");
            this.spinner.hide();
            this.itemForm.reset();
            this.myModal.hide(); 
            this.getCenterServices();
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
   
  }
  edit(val)
  {
    this.updatedId=val.RecordId;
    this.itemForm.controls.CenterId.setValue(val.CenterId);
    this.itemForm.controls.ServiceTypeId.setValue(val.ServiceTypeId);
    this.itemForm.controls.ServiceId.setValue(val.ServiceId);
    this.itemForm.controls.RecordId.setValue(val.RecordId);
    this.itemForm.controls.LocationsCount.setValue(val.LocationsCount);
    this.itemForm.controls.IsActive.setValue(val.IsActive);
    this.itemForm.controls.FloorsCount.setValue(val.FloorsCount);
  }
  create()
  {
    this.itemForm.reset();
    this.updatedId=0;
  }
  deleteService(val)
  {
    debugger;
    Swal.fire({
      title: 'Are you sure want to Delete?',      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        const formData: FormData = new FormData();       
        formData.append('RecordID', val.RecordId);    
         
        this.spinner.show();   
        this.myHttpservie.SC_DeleteServicesofCenters(formData).subscribe((Data) => {         
          this.toastr.success("Record Deleted Successfully","Response");
          this.spinner.hide();
          this.getCenterServices();
        }, error => { this.spinner.hide(), this.toastr.warning('Server Response...', error.statusText) }); 
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
    
      }
    })

    
  }
  changeStatus(val)
  {
    debugger;
    Swal.fire({
      title: 'Are you sure want to Update Status?',      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();   
        this.myHttpservie.CenterServicesChangeStatus(val.RecordId).subscribe((Data) => {         
          this.toastr.success("Status Updated Successfully","Response");
          this.spinner.hide();
          this.getCenterServices();
        }, error => { this.spinner.hide(), this.toastr.warning('Server Response...', error.statusText) }); 
        
      } else if (result.dismiss === Swal.DismissReason.cancel ) {
        this.getCenterServices();
      }
    })

    
  }
  filter()
  {
    this.getCenterServices();
  }
  Reset()
  {
    this.itemForm.reset();
  }

}
