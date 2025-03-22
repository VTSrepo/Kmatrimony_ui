import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
import { ProfilesHomeComponent } from './profiles-home/profiles-home.component';
import { profileTableComponent } from '../shared/components/profile-table/profile-table.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profiles-routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfilesHomeComponent, ProfileCreateComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class ProfilesModule {}
