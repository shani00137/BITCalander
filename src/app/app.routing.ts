import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { LoginComponent } from './views/login/login.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { P500Component } from './views/error/500.component';
import { P404Component } from './views/error/404.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';

import { SettingsComponent } from './views/bitsettings/settings/settings.component';

import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { ManagecentersComponent } from './views/managecenters/managecenters.component';
import { ServicesComponent } from './views/manageservices/services/services.component';
import { ManageserviceofcenterComponent } from './views/manageserviceofcenter/manageserviceofcenter/manageserviceofcenter.component';

export const routes: Routes = [
 
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },


  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent,
    data: {
      title: 'forgetpassword'
    }
  },
 
 
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        component: SettingsComponent,
        data: {
          title: 'Page 404'
        }
      },
      
    
    
      
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path:'change-password',component:ChangePasswordComponent
      }
      
      
      ,
      {
        path:'settings',component:SettingsComponent
      },
      {
        path:'settings',component:SettingsComponent
      },
      
      
      {
        path:'managecenters',component:ManagecentersComponent
      },
      
      {
        path:'services',component:ServicesComponent
      },
      {
        path:'paginations',component:PaginationComponent
      }
      ,
      {
        path:'manageserviceofcenter',component:ManageserviceofcenterComponent
      }
     
      
      
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
