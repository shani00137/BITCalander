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
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  SearchMD:any={};
  serviceList: any=[];
  itemForm: FormGroup;
  myInputVariable: ElementRef;
  accountInfo:any={};
  @ViewChild('myModal', {static: false}) public myModal: ModalDirective;
  lookupList: any=[];
  ImagesList: any;
  selectedLookupID:any;
  updatedId: any;
  constructor(private dataservice: DataService, private formBuilder: FormBuilder, private toastr: ToastrService,private myHttpservie:HttpProvierService, private spinner: NgxSpinnerService) 
  {
    this.itemForm = this.formBuilder.group({
      ServiceName: [this.accountInfo.ServiceName,[ Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      ServiceId: [this.accountInfo.ServiceId],
      ServiceTypeId: [this.accountInfo.ServiceTypeId],
      Description: [this.accountInfo.Description],
      ServiceLogo: [this.accountInfo.ServiceLogo],
      TimeRequiredMin: [this.accountInfo.TimeRequiredMin,[ Validators.required]],
      Charges: [this.accountInfo.Charges],
      IsActive: [this.accountInfo.IsActive],
      Images:[this.accountInfo.Images],
     
   });
  }

  ngOnInit(): void {
    this.getServices();
    this.getServiceLookUp();
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
  getServices() {
  
    this.spinner.show();
    this.serviceList=[];
    var ServiceTypeId=this.selectedLookupID;
    if(ServiceTypeId==null)
    {
    ServiceTypeId="";
    }
    this.myHttpservie.SC_GetServices(ServiceTypeId).subscribe((Data) => {
      var data=Data.json() ;
      this.serviceList =data.Data;
      this.spinner.hide();
    }, error => { this.spinner.hide(), this.toastr.warning('Server not Response...', 'Please Refresh!') });
  }
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
       
      const file = event.target.files[0];
      this.ImagesList=file;
    }
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
        this.itemForm.controls.ServiceId.setValue(0);
        //  formData.append('Images', this.ImagesList, this.ImagesList.name); 
        formData.append('ServiceName',this.itemForm.controls.ServiceName.value);
        formData.append('ServiceId',this.itemForm.controls.ServiceId.value);
        formData.append('ServiceTypeId',this.itemForm.controls.ServiceTypeId.value);
        formData.append('Description',this.itemForm.controls.Description.value);
        formData.append('ServiceLogo','no');
        formData.append('TimeRequiredMin',this.itemForm.controls.TimeRequiredMin.value);   
        formData.append('Charges',this.itemForm.controls.Charges.value); 
        formData.append('IsActive',this.itemForm.controls.IsActive.value);     
        this.spinner.show();   
          this.myHttpservie.SC_SaveServices(formData).subscribe((Data) => {         
            this.toastr.success("Successfully","Response");
            this.spinner.hide();
            this.itemForm.reset();
            this.myModal.hide(); 
            this.getServices();
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
        formData.append('ServiceName',this.itemForm.controls.ServiceName.value);
        formData.append('ServiceId',this.itemForm.controls.ServiceId.value);
        formData.append('ServiceTypeId',this.itemForm.controls.ServiceTypeId.value);
        formData.append('Description',this.itemForm.controls.Description.value);
        formData.append('ServiceLogo','no');
        formData.append('TimeRequiredMin',this.itemForm.controls.TimeRequiredMin.value);   
        formData.append('Charges',this.itemForm.controls.Charges.value); 
        formData.append('IsActive',this.itemForm.controls.IsActive.value);     
        this.spinner.show();   
          this.myHttpservie.SC_SaveServices(formData).subscribe((Data) => {         
            this.toastr.success("Successfully","Response");
            this.spinner.hide();
            this.itemForm.reset();
            this.myModal.hide(); 
            this.getServices();
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
        formData.append('ServiceId', val.ServiceId);    
         
        this.spinner.show();   
        this.myHttpservie.SC_DeleteServices(formData).subscribe((Data) => {         
          this.toastr.success("Record Deleted Successfully","Response");
          this.spinner.hide();
          this.getServices();
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
        this.myHttpservie.ServicesChangeStatus(val.ServiceId).subscribe((Data) => {         
          this.toastr.success("Status Updated Successfully","Response");
          this.spinner.hide();
          this.getServices();
        }, error => { this.spinner.hide(), this.toastr.warning('Server Response...', error.statusText) }); 
        
      } else if (result.dismiss === Swal.DismissReason.cancel ) {
        this.getServices();
      }
    })

    
  }
  edit(val)
  {
    this.updatedId=val.ServiceId;
    this.itemForm.controls.ServiceId.setValue(val.ServiceId);
    this.itemForm.controls.ServiceTypeId.setValue(val.ServiceTypeId);
    this.itemForm.controls.Description.setValue(val.Description);
    this.itemForm.controls.Charges.setValue(val.Charges);
    this.itemForm.controls.ServiceLogo.setValue(val.ServiceLogo);
    this.itemForm.controls.ServiceName.setValue(val.ServiceName);
    this.itemForm.controls.TimeRequiredMin.setValue(val.TimeRequiredMin);

  }
  SearchTypes()
  {
    this.getServices();
  }
  Reset(){this.itemForm.reset()}
  create(){this.itemForm.reset(),this.updatedId=0;}


}
