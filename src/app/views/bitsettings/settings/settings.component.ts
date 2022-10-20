import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpProvierService } from '../../../../providers/http-provier.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DataService } from '../../../../providers/data.service';
import { formatDate } from '@angular/common';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedLookupID:any;
  lookupTypeList: any=[];
  isLoading:boolean=false;
  lookupList: any=[];
  accountInfo:any={"Comments":""};
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  
  itemForm: FormGroup;
  @ViewChild('myModal', {static: false}) public myModal: ModalDirective;
  @ViewChild('childModal', {static: false}) public childModal: ModalDirective;
  
  OutlineFile: any;
  ImagesList: File;
  searchText:any;
  UpdateId: any;
  page:any;
  selectedImageUrl: any;
  lookUpMasterList: any=[];
  childLookUpList:any=[];
  hideme = [];  
  Index: any;
  title: any;
  lookupList2: any=[];
  SelectedParentId: any;
  constructor(private router: Router,private dataservice:DataService, private formBuilder: FormBuilder, private toastr: ToastrService,private myHttpservie:HttpProvierService, private spinner: NgxSpinnerService) 
  { 
    this.itemForm = this.formBuilder.group({
      LookupName: [this.accountInfo.LookupName,[ Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      LookupId: [this.accountInfo.LookupId],
      ParentId: [this.accountInfo.ParentId],
      LookupTypeID: [this.accountInfo.lookupTypeID,[ Validators.required]],
      LookupStatic: [this.accountInfo.LookupStatic,[ Validators.required]],
      Comments: [this.accountInfo.Comments],
      Images: [this.accountInfo.Images],
      StatusId: [this.accountInfo.StatusId],
  
   });
  }

  ngOnInit(): void {
    this.getLookTypes();
  }
  getLookTypes() {
    this.isLoading=true;
    this.lookupTypeList=[];
    this.myHttpservie.getLookUpTypes().subscribe((Data) => {
      this.isLoading=false;
 
      var obj=Data.json();

      this.lookupTypeList = obj.Data;
      console.log(obj.Data);
    }, error => { this.spinner.hide(),this.isLoading=false, this.toastr.warning('Server Response...', error.statusText) });
  }
  SearchTypes()
  {
    debugger;
    if(this.selectedLookupID)
    {
      this.spinner.show();
      this.lookupList=[];
      this.lookUpMasterList=[];
      this.lookupList2=[];
      this.hideme=[];
      this.myHttpservie.getAllLookByTypeId(this.selectedLookupID).subscribe((Data) => {
        this.spinner.hide();
        var obj=Data.json();
     
        this.Index=0;
        this.lookUpMasterList=obj.Data.Result;
        debugger;
        var listLkup=obj.Data.Result;
        this.lookupList2=[];
       for(let i=0;i<listLkup.length;i++)
       {
        if(listLkup[i].ChildsId==null)
        {
          this.lookupList.push(listLkup[i]);
        }
       }
       console.log(this.lookupList);
       this.lookupList2=this.lookupList;
       
     
      }, error => { this.spinner.hide(), this.toastr.warning('Server Response...', error.statusText) });
    }
    else{
      this.lookupList=[];
    }

  }
  showChildInfo(index,val)
  {
    
    this.childLookUpList=[];
  
    for(let i=0;i<this.lookUpMasterList.length;i++)
    {
      debugger;
      if(val.CodeId==this.lookUpMasterList[i].ChildsId)
      {
      
          this.childLookUpList.push(this.lookUpMasterList[i]);
      }
    }
    debugger;
    this.hideme[index] = !this.hideme[index];  
    this.Index = index;  
    this.SelectedParentId=val.LookupId;
    
  }
  changeStatus(val)
  {
    debugger;
    var CurrentId=val.StatusId==2?3:2;
    this.spinner.show();
    this.myHttpservie.ChangeLookupStatus(val.LookupId, CurrentId).subscribe((Data) => {
      debugger;
    
      var obj=Data.json();
      if(obj.Success==true)
      {
        this.toastr.success("Response",'Updated Successfuly');
        this.SearchTypes();
      }
      else
      {
        this.toastr.warning("Response",'Something wrong');
      }
      this.spinner.hide();
      debugger;
     
    }, error => { this.spinner.hide(), this.toastr.warning('Server Response...', error.statusText) });
  }
  delete(val)
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
        
      this.myHttpservie.RemoveLookUp(val.LookupId).subscribe((Data) => {
        debugger;
        var obj=Data.json();       
          this.toastr.success("Response",'Updated Successfully');
        this.SearchTypes();
       
      }, error => { this.spinner.hide(), this.toastr.warning('Server Response...', error.statusText) });
  }});
  }
  create()
  {
    this.itemForm.reset();
    this.myInputVariable.nativeElement.value = "";
    this.ImagesList=null;
    this.selectedImageUrl=null;
    this.title=' Add/Update LookUp';
    this.itemForm.controls.LookupTypeID.setValue(this.selectedLookupID);
  }
  onOutlineFileChange(event) {
  
    if (event.target.files.length > 0) {
      debugger;
      const file = event.target.files[0];
      this.ImagesList=file;
    }
  }
  addChild(val)
  {
    this.title=' Add/Update Children of '+val.LookupName;
    this.itemForm.reset();
    this.myInputVariable.nativeElement.value = "";
    this.ImagesList=null;
    this.selectedImageUrl=null;
    this.itemForm.controls.LookupTypeID.setValue(this.selectedLookupID);
    this.itemForm.controls.ParentId.setValue(this.SelectedParentId);
  }
  EditChild(val)
  {
    this.itemForm.controls.LookupTypeID.setValue(this.selectedLookupID);
    this.itemForm.controls.ParentId.setValue(this.SelectedParentId);
    this.myInputVariable.nativeElement.value = "";
    this.ImagesList=null;
    this.UpdateId=val.LookupId;
    this.itemForm.controls.LookupName.setValue(val.LookupName);
    this.itemForm.controls.LookupId.setValue(val.LookupId);
    this.itemForm.controls.LookupTypeID.setValue(val.LookupTypeId);
    this.itemForm.controls.LookupStatic.setValue(val.LookupStatic);
    this.itemForm.controls.Comments.setValue(val.Comments);   
   
    this.itemForm.controls.StatusId.setValue(val.StatusId);
    this.selectedImageUrl=val.LImage;
  }
  save()
  {
    if(this.itemForm.valid)
    {
      debugger;
      this.spinner.show();
      this.itemForm.controls.StatusId.setValue(1);
      var Comments=this.itemForm.controls.Comments.value
      if(Comments==null)
      {
        Comments="";
      }
      const formData = new FormData();
      formData.append('LookupTypeID', this.itemForm.controls.LookupTypeID.value);
      formData.append('LookupName', this.itemForm.controls.LookupName.value);
      formData.append('LookupId', this.itemForm.controls.LookupId.value);
      formData.append('LookupStatic', this.itemForm.controls.LookupStatic.value);
      formData.append('Comments', Comments.toString());   
     
      formData.append('images', this.ImagesList);
      formData.append('StatusId', this.itemForm.controls.StatusId.value);
      this.myHttpservie.AddLookup(formData).subscribe((Data) => {
     
        var obj=Data.json();
        if(obj.Success==true)
        {
          this.toastr.success("Response",'Save Successfully');
          this.SearchTypes();
          this.spinner.show();
          this.myModal.hide();
          this.lookupList=[];
        }
        else
        {
          this.toastr.warning("Response",'Something wrong');
        }
       
       
      }, error => { this.spinner.hide(), this.toastr.warning('Server Response...', error.statusText) });
    }
    else
    {
      Object.keys(this.itemForm.controls).forEach(field => {
        const control = this.itemForm.get(field);
        control.markAsTouched({ onlySelf: true });
       });
    }
  }
  Edit(val)
  {
    debugger;
    this.myInputVariable.nativeElement.value = "";
    this.ImagesList=null;
    this.UpdateId=val.LookupId;
    this.itemForm.controls.LookupName.setValue(val.LookupName);
    this.itemForm.controls.LookupId.setValue(val.LookupId);
    this.itemForm.controls.LookupTypeID.setValue(val.LookupTypeId);
    this.itemForm.controls.LookupStatic.setValue(val.LookupStatic);
    this.itemForm.controls.Comments.setValue(val.Comments);   
    this.itemForm.controls.StatusId.setValue(val.StatusId);
    this.selectedImageUrl=val.LImage;
  }
  Reset()
  {
    this.itemForm.reset();
  }
  viewImage(url)
  {
    window.open(url, "_blank");
  }
  saveLookUpChild()
  {
    debugger;
    if(this.itemForm.valid)
    {
      if(this.itemForm.controls.ParentId.value)
      {
        this.spinner.show();
        this.itemForm.controls.StatusId.setValue(1);
        var Comments=this.itemForm.controls.Comments.value
        if(Comments==null)
        {
          Comments="";
        }
        const formData = new FormData();
        formData.append('LookupTypeID', this.itemForm.controls.LookupTypeID.value);
        formData.append('LookupName', this.itemForm.controls.LookupName.value);
        formData.append('LookupId', this.itemForm.controls.LookupId.value);
        formData.append('LookupStatic', this.itemForm.controls.LookupStatic.value);
        formData.append('ParentId', this.itemForm.controls.ParentId.value);
        formData.append('Comments', Comments.toString());   
       
        formData.append('images', this.ImagesList);
        formData.append('StatusId', this.itemForm.controls.StatusId.value);
        this.myHttpservie.AddLookup(formData).subscribe((Data) => {
       
          var obj=Data.json();
          if(obj.Success==true)
          {
            this.toastr.success("Response",'Save Successfully');
            this.SearchTypes();
            this.spinner.show();
            this.childModal.hide();
          }
          else
          {
            this.toastr.warning("Response",'Something wrong');
          }
          
         
        }, error => { this.spinner.hide(), this.toastr.warning('Server Response...', error.statusText) });
      }
      else
      {
        this.toastr.warning("Please choose Lookup..","Lookup Required..")
      }
    }
    else{
      Object.keys(this.itemForm.controls).forEach(field => {
        const control = this.itemForm.get(field);
        control.markAsTouched({ onlySelf: true });
       });
    }
   
  }

}
