import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SubscriberHomeComponent } from './subscriber-home/subscriber-home.component';
import { SubscriberSearchComponent } from './subscriber-search/subscriber-search.component';
import { ServicesComponent } from './services/services.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    HomeComponent,
    AdminHomeComponent,
    ServicesComponent,
    SubscriberHomeComponent,
    SubscriberSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [HomeService],
})
export class HomeModule {}
