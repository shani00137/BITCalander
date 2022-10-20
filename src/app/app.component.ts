import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params, RouterEvent, ParamMap } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { UtilityService } from '../providers/utility.service';
import { ToastrService } from 'ngx-toastr';
import { LocationHubService } from '../providers/location-hub.service';
import { HttpProvierService } from '../providers/http-provier.service';


@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements AfterViewInit  {
  latitude: string;
  longitude: string;
  locationSubscription: any;
  usersInfo: any=[];
  Loginmodel: any={};
  permissinModel:any= {};
  constructor(
    private myHttpservie:HttpProvierService,
    private router: Router,
    public iconSet: IconSetService,
    public utilityService:UtilityService,
    public location: LocationHubService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {

    iconSet.icons = { ...freeSet };
  }


  ngAfterViewInit() {
    debugger;
   
      var user = new URLSearchParams(window.location.search).get('user');
      var pass = new URLSearchParams(window.location.search).get('pass');
      if(user && pass)
      {
          this.onLoginWithUrl(user,pass );
      }
      else
      {
         this.activatedRoute.queryParams.subscribe((params: ParamMap) => {
        const username = params['user'];
        const pass = params['pass'];
        
        if(username && pass)
        {
          this.onLoginWithUrl(username,pass );
        }
      
    
      });
      }
   
    this.router.events.subscribe(
      (event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
         
            // console.log(this.activatedRoute.snapshot.queryParamMap.get('user'))
            
        }
      }
    );
  
  
  
    
   // this.getUserAuthication();
  }
  onLoginWithUrl(username,password)
  {
    
    
       this.toastr.success("Login now please wait...","Verifying..");
       this.Loginmodel={};
       this.Loginmodel.userName=username;
       this.Loginmodel.password=password;
       this.Loginmodel.roleID=10101;
      this.myHttpservie.getLoginDetail(this.Loginmodel).subscribe(data=>{
        this.usersInfo=data.json();
        debugger;
          if(this.usersInfo.Success==false)
          {
            this.toastr.error("Alert","Wrong User Or Password");
            // this.router.navigateByUrl('login')
            sessionStorage.removeItem("UserNo");
            sessionStorage.removeItem("UserName");
            // sessionStorage.setItem("Token","bearer "+this.usersInfo.Data.Token);
            // sessionStorage.setItem("UserPhoto", this.usersInfo.Data.User.UserPhoto);
            this.router.navigateByUrl('settings')
            setTimeout(function () {
             
              window.location.reload();   
          }, 1000);
          }  
          else
          {
            // this.getAccountPermission(this.usersInfo.Data.User.UserID);
            sessionStorage.setItem("UserNo",this.usersInfo.Data.User.UserID);
            sessionStorage.setItem("UserName",this.usersInfo.Data.User.UserName);
            sessionStorage.setItem("Token","bearer "+this.usersInfo.Data.Token);
            sessionStorage.setItem("UserPhoto", null);
            this.router.navigateByUrl('settings')
            setTimeout(function () {
             
              window.location.reload();   
          }, 1000); 
              
            
          }    
     
     
      },error=>{ this.toastr.warning("Server error",error._body)})
   
  }
  getAccountPermission(id)
{
  debugger;
  this.permissinModel={};
  this.permissinModel.userId=id

  this.myHttpservie.getAccountPermission(this.permissinModel).subscribe((Data) => {
    var obj=Data.json();
    debugger;
    if(obj.Success==true)
    {
      this.router.navigateByUrl('settings')
    }
    else
    {
      this.toastr.warning(obj.Error.MessageEn,"Permission")
    }
    
  }, error => { this.toastr.warning('Server Response...', error.statusText) });
}

  getUserAuthication(): any {
    debugger;
    this.utilityService.isLogged().then((result: boolean) => {
      if (!result) {
        debugger
      
          this.router.navigateByUrl('/settings');

      }
      else {
        debugger
      // this.router.navigateByUrl('/dashboard');
      }

    });
  }
}
