import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppInterceptor } from './app.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppService } from './app.service';
import { CanActivateRoute, Permissions } from './shared/services/authguard.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  providers: [AppService,Permissions,{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }, CanActivateRoute],
  bootstrap: [AppComponent]
})
export class AppModule { }
