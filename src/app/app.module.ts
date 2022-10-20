import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {SpinnerLayoutComponent} from '../app/spinner-layout/spinner-layout.component'
import { ModalModule } from 'ngx-bootstrap/modal';

// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)

import {FilterPipe} from '../app/filter.pipe'
import { ToastrModule } from 'ngx-toastr';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { Subject } from 'rxjs';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/login/login.component';




const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpProvierService } from '../providers/http-provier.service';
import { DataService } from '../providers/data.service';
import { Http, HttpModule } from '@angular/http';
import { UtilityService } from '../providers/utility.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';
import { LocationHubService } from '../providers/location-hub.service';

import { SettingsComponent } from './views/bitsettings/settings/settings.component';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SortPipe } from '../providers/sortpipe';
import { ManagecentersComponent } from './views/managecenters/managecenters.component';
import { ServicesComponent } from './views/manageservices/services/services.component';
import { ManageserviceofcenterComponent } from './views/manageserviceofcenter/manageserviceofcenter/manageserviceofcenter.component';
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.arrows
};



@NgModule({
  imports: [
    BrowserModule,
   
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot([], { enableTracing: true }),
  
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,

    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),



    ChartsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    IconModule,

    NgWizardModule.forRoot(ngWizardConfig),
    ModalModule.forRoot(),
    IconSetModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    ScrollingModule,
    CommonModule,
    NgxPaginationModule     ,
    TimepickerModule.forRoot(),
    HttpClientModule, AngularEditorModule,
    NgSelectModule,
   
    InfiniteScrollModule  ,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
 
    LoginComponent,
   
    SpinnerLayoutComponent,
    FilterPipe,
    SortPipe,
    DashboardComponent,
 
    ForgetPasswordComponent,

 
    SettingsComponent,

 
    ManagecentersComponent,

 
    ServicesComponent,

 
    ManageserviceofcenterComponent
  ],

  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },HttpProvierService,LocationHubService,SortPipe,DataService,DatePipe,UtilityService,HttpModule,
    IconSetService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
