import {Component, OnInit, ViewChild } from '@angular/core';
import { navItems } from '../../_nav';
import { HttpProvierService } from '../../../providers/http-provier.service';
import { DataService } from '../../../providers/data.service';
import { NavData } from '../../models/navModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  
  public sidebarMinimized = false;
  public navItems = navItems;
  MenuList: any=[];
  @ViewChild(DefaultLayoutComponent) child;
  message:any=[];
  User: string;
  UserPhoto: string;
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  constructor(   private activatedRoute: ActivatedRoute, private data: DataService, private myHttpservie:HttpProvierService)
  {
    this.User=sessionStorage.getItem("UserName");
    this.UserPhoto=sessionStorage.getItem("UserPhoto");
  }
  ngOnInit(): void {
  var data=this.data.getMessage();


  //   setTimeout(() => {
      
     
  // }, 4000);
    // this.navItems.push(
    //   {
    //     name: 'Dashboard',
    //     url: '/dashboard',
    //     icon: 'icon-speedometer',
    //     badge: {
    //       variant: 'info',
    //       text: 'NEW'
    //     }
    //   },
    //   {
    //     name: 'Dashboard',
    //     url: '/dashboard',
    //     icon: 'icon-speedometer',
    //     badge: {
    //       variant: 'info',
    //       text: 'NEW'
    //     }
    //   },
    //   {
    //     name: 'Dashboard',
    //     url: '/dashboard',
    //     icon: 'icon-speedometer',
    //     badge: {
    //       variant: 'info',
    //       text: 'NEW'
    //     }
    //   },
    //   {
    //     name: 'Base',
    //     url: '/base',
    //     icon: 'icon-puzzle',
    //     children: [
    //       {
    //         name: 'Cards',
    //         url: '/base/cards',
    //         icon: 'icon-puzzle'
    //       },
    //       {
    //         name: 'Carousels',
    //         url: '/base/carousels',
    //         icon: 'icon-puzzle'
    //       },
    //       {
    //         name: 'Collapses',
    //         url: '/base/collapses',
    //         icon: 'icon-puzzle'
    //       },
    //       {
    //         name: 'Forms',
    //         url: '/base/forms',
    //         icon: 'icon-puzzle'
    //       },
    //       {
    //         name: 'Navbars',
    //         url: '/base/navbars',
    //         icon: 'icon-puzzle'
    
    //       },
    //       {
    //         name: 'Pagination',
    //         url: '/base/paginations',
    //         icon: 'icon-puzzle'
    //       },
    //       {
    //         name: 'Popovers',
    //         url: '/base/popovers',
    //         icon: 'icon-puzzle'
    //       },
    //       {
    //         name: 'Progress',
    //         url: '/base/progress',
    //         icon: 'icon-puzzle'
    //       },
    //       {
    //         name: 'Switches',
    //         url: '/base/switches',
    //         icon: 'icon-puzzle'
    //       },
    //       {
    //         name: 'Tables',
    //         url: '/base/tables',
    //         icon: 'icon-puzzle'
    //       },
    //       {
    //         name: 'Tabs',
    //         url: '/base/tabs',
    //         icon: 'icon-puzzle'
    //       },
    //       {
    //         name: 'Tooltips',
    //         url: '/base/tooltips',
    //         icon: 'icon-puzzle'
    //       }
    //     ]
    //   },
    // );
  }
  Logout()
  {
    sessionStorage.setItem('UserNo',"");
    sessionStorage.setItem('NavItems',"");
   
  }
  
}
