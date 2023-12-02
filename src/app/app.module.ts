import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BackendInterceptor } from './helper/backend.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {MatDialogModule} from '@angular/material/dialog';
import { TandCComponent } from './login/tand-c/tand-c.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TandCComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxExtendedPdfViewerModule,
    MatDialogModule,
    PdfViewerModule,
    NgMultiSelectDropDownModule.forRoot()
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  
 }
