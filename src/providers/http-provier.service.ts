import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';




@Injectable({
  providedIn: 'root'
})
export class HttpProvierService {
public serverName="http://167.86.97.165/apiabc/";
//public serverName="/";
  constructor(private http: Http) {
  
   } 
  //forget password
  
  forgetPassword(detail) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("UserNo")
    });
    return this.http.post(this.serverName+'api/login/RecoveryPassword',detail,{headers:headers});
  }
  changeUserControllerPermissionStatus(details) {
    return this.http.post(this.serverName+'api/UserPermission/SaveUserControllerPermission/',details);
  }
    ChanagePassword(Id,Old,newP) {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem("UserNo")
      });
      return this.http.get(this.serverName+'api/login/ChangePassword/'+Id+","+Old+","+newP,{headers:headers});
    }
 
  getPermissionById(id: any) {
    return this.http.get(this.serverName+'api/UserPermission/Details/' + id);
  }
  getAllMenuandPages(id) {
    return this.http.get(this.serverName+'api/UserPermission/GetManuePages/'+id);
  }
  //get login details
  getLoginDetail(detail:any) {
    const headers = new Headers({
      'Content-Type': 'application/json',   
    });
    return this.http.post(this.serverName+'api/v1/Accounts/NewLoginABC',detail,{headers:headers});
  }
  getSimpleIdeas(employee, PageNumber,PageSize,StatusId)
  {
    debugger;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    debugger;
    return this.http.get(this.serverName+'api/api/v1/BITEmployees/GetSimpleIdeas?employee='+employee+'&PageNumber='+PageNumber+'&PageSize='+PageSize+'&IdeaStatusId='+StatusId,{headers:headers});
  }
  getLoginDetailOfUser(detail:any) {
    return this.http.post(this.serverName+'api/login/Details',detail);
  }

  resetPassword(details)
  {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("UserNo")
    });
    return this.http.post(this.serverName+'api/Employee/ResetPassowrd',details,{headers:headers});
  }


  getTopDashboardFigures() {
    return this.http.get(this.serverName+'api/Dashboard/GetDashbordTopFigures');
  
  
  
  }
  getAllTask() {
    return this.http.get(this.serverName+'api/Task/GetAllTask');  
  }
  getLookUpById() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/BITEmployees/GetLookup?LookupTypeID=244',{headers:headers});  
  }
  deleteSimpleIdea(details) {
    debugger;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/DeleteSimpleBitIdea?SimpleIdeaNo='+details,{headers:headers});  
  }
  UpdateSimpleBitIdea(details) {
    debugger;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/UpdateSimpleBitIdea',details,{headers:headers});  
  }
  GetLookupsByParent(id) {
    debugger;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/Lookups/SC_GetLookupsByParent?parentId='+id,{headers:headers});  
  }
  getLookUpTypes() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/AppointmentManagement/GetLookupTypes',{headers:headers});  
  }
  getAllLookByTypeId(id) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/v1/Appointments/SC_GetAppintmentLookupChild?LookupTypeId='+id,{headers:headers});  
  }
  
  getBITIdeaPromoter(id) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/BITEmployees/GetBITIdeaPromoter?ideaId='+id,{headers:headers});  
  }
  getBITIdeaCommittee(id) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/BITEmployees/GetBITIdeaCommittee?ideaId='+id,{headers:headers});  
  }
  getAllBITEmployee() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/Performance/GetEmployees',{headers:headers});  
  }
  getEmployeeByArea(AreaCode) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/BITEmployees/GetBitEmployees?empBITBusinessArea='+AreaCode,{headers:headers});  
  }
  ChangeLookupStatus(lookUpId,statusId) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/ChangeLookupStatus?LookupId='+lookUpId+'&StatusId='+statusId,{headers:headers});  
  }
  RemoveLookUp(lookUpId) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/ChangeLookupStatus?StatusId=4&LookupId='+lookUpId,{headers:headers});  
  }
  
  AddLookup(details) {
    const headers = new Headers({
      
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/AddLookup',details,{headers:headers});  
  }
  WT_GetAllClaims() {
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/Waranty/WT_GetAllClaims',{headers:headers});  
  }
  getIdeasKaizen(ideaId,IdeaStatus,IdeaSource,IdeaSourceBusinessArea,IdeaBITResp,PageNumber,PageSize) {
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    });
    debugger;
    return this.http.get(this.serverName+'api/api/v1/BITEmployees/GetIdeasKaizen?ideaId='+ideaId+'&IdeaStatus='+IdeaStatus+'&IdeaSource='+IdeaSource+'&IdeaSourceBusinessArea='+IdeaSourceBusinessArea+'&IdeaBITResp='+IdeaBITResp+'&PageNumber='+PageNumber+'&PageSize='+PageSize,{headers:headers});  
  }
  GetBussinessArea() {
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/BITEmployees/GetBussinessArea',{headers:headers});  
  }
  UpdateKaizenIdea(details) {
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/UpdateKaizenIdea',details,{headers:headers});  
  }
  AddKaizenIdea(details) {
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/AddKaizenIdea',details,{headers:headers});  
  }
  AddInfoToKaizenIdea(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/AddBitIdeaInfo',details,{headers:headers});  
  }
  UpdateKaizenIdeaInfo(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/UpdateBitIdeaInfo',details,{headers:headers});  
  }
  AddBitIdeaFile(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/AddBitIdeaFile',details,{headers:headers});  
  }
  DeleteBitIdeaFile(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/DeleteBitIdeaFile',details,{headers:headers});  
  }
  DeleteBitIdeaInfo(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/DeleteBitIdeaInfo',details,{headers:headers});  
  }
  GetIdeaInfo(id) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/BITEmployees/GetIdeaInfo?IdeaID='+id,{headers:headers});  
  }
  GetIdeaFile(id) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/BITEmployees/GetIdeaFile?IdeaID='+id,{headers:headers});  
  }
  AddIdeaPromoter(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/AddIdeaPromoter',details,{headers:headers});  
  }
  AddIdeaCommittee(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/AddIdeaCommittee',details,{headers:headers});  
  }
  getAccountPermission(UserId)
  {
    debugger;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    
    return this.http.post(this.serverName+'api/api/v1/Accounts/Permissions',UserId,{headers:headers});
  }
  SendStackholderCommunication(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/api/v1/BITEmployees/SendStackholderCommunication',details,{headers:headers});  
  }
  getStackholderChatt(id) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/api/v1/BITEmployees/GetBitCommunications?ideaSerial='+id,{headers:headers});  
  }
  SC_GetServiceCentersABC() {
    const headers = new Headers({
      'Content-Type': 'application/json','Access-Control-Allow-Origin':'*',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/v1/ServiceCenters/SC_GetServiceCentersABC',{headers:headers});  
  }
  SC_GetServices(ServiceTypeId) {
    const headers = new Headers({
      'Content-Type': 'application/json','Access-Control-Allow-Origin':'*',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/v1/ServiceCenters/SC_GetServices?ServiceTypeId='+ServiceTypeId,{headers:headers});  
  }
  SC_GetAppintmentLookupChild()
  {
    const headers = new Headers({
      'Content-Type': 'application/json','Access-Control-Allow-Origin':'*',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/v1/Appointments/SC_GetAppintmentLookupChild?LookupTypeId=102',{headers:headers});  
  }
  SC_SaveServiceCenters(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/v1/ServiceCenters/SC_SaveServiceCentersABC',details,{headers:headers});  
  }
  SC_SaveServices(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.post(this.serverName+'api/v1/ServiceCenters/SC_SaveServices',details,{headers:headers});  
  }
  SC_DeleteServices(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/v1/ServiceCenters/SC_DeleteServices',details,{headers:headers});  
  }
  ServicesChangeStatus(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token"),
      'Content-Type': 'application/json',
    });
    return this.http.post(this.serverName+'api/v1/ServiceCenters/ChangeStatus?ServiceId='+details,{},{headers:headers});  
  }

  SC_GetServicesofCenters(ServiceTypeId,CenterId) {
    const headers = new Headers({
      'Content-Type': 'application/json','Access-Control-Allow-Origin':'*',
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.get(this.serverName+'api/v1/ServicesOfCenters/SC_GetServicesofCenters?ServiceTypeId='+ServiceTypeId+'&CenterId='+CenterId,{headers:headers});  
  }
  SC_SaveServicesofCenters(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    });
    return this.http.post(this.serverName+'api/v1/ServicesOfCenters/SC_SaveServicesofCenters',details,{headers:headers});  
  }
  SC_DeleteServicesofCenters(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token")
    
    });
    return this.http.post(this.serverName+'api/v1/ServicesOfCenters/SC_DeleteServicesofCenters',details,{headers:headers});  
  }
  CenterServicesChangeStatus(details) {
    debugger;
    const headers = new Headers({      
      'Authorization': sessionStorage.getItem("Token"),
      'Content-Type': 'application/json',
    });
    return this.http.post(this.serverName+'api/v1/ServicesOfCenters/ChangeStatus?RecordID='+details,{},{headers:headers});  
  }
}
