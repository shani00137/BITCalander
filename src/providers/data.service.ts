import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private   messageSource = new BehaviorSubject('default message');
   currentMessage = this.messageSource.asObservable();
  NavLogin:any=[];
  SupplierMD:any={};
  CustomerMD:any={};
  StockInvoiceNo:any;
  SaleInvoice:any;
  BankMd: any={};
  SchemeMd: any={};
  SchemeSessionMd: any={};
  constructor(private router: Router,private toastr: ToastrService) { }

  changeMessage(message:any) {
   
    this.NavLogin=message;
    
    sessionStorage.setItem('NavItems',JSON.stringify( this.NavLogin));

  }
  getMessage() {
    debugger;
    if(sessionStorage.getItem('NavItems')!="")
    {
      return JSON.parse(sessionStorage.getItem('NavItems'));
    }
    else
    {
      // this.router.navigateByUrl('/dashboard');
    }
    
  }
  setSupplier(val)
  {
    this.SupplierMD=val;
  }
  getSupplier()
  {
    return this.SupplierMD;
  }
  setCustomer(val)
  {
    this.CustomerMD=val;
  }
  getCustomer()
  {
    return this.CustomerMD;
  }
  setPurchaseInvoice(id)
  {
    this.StockInvoiceNo=id;

  }
  getPurchaseInvoice()
  {
    return this.StockInvoiceNo;
  }
  setSaleInvoice(id)
  {
    this.SaleInvoice=id;

  }
  getSaleInvoice()
  {
    return this.SaleInvoice;
  }
  setBank(id)
  {
    this.BankMd=id;
  }
  getBank()
  {
    return this.BankMd;
  }
  setSchemeId(id)
  {
    this.SchemeMd=id;
  }
  getScheme()
  {
    return this.SchemeMd;
  }
  setSchemeSession(id)
  {
    this.SchemeSessionMd=id;
  }
  getSchemeSession()
  {
    return this.SchemeSessionMd;
  }
  showError(error: any) {
    debugger;
  var data=error.json();     
  if(data.Data==null || data.Data==false)
  {
    this.toastr.warning('Server Response...',data.Error==null? 'Something wrong...':data.Error.MessageEn);
  }
  else
  {
    this.toastr.warning('Server Response...', data.Error.MessageEn);
  }
 
  

}
}
