import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CanActivateRoute} from '../shared/services/authguard.service';
import { ProfilesHomeComponent } from './profiles-home/profiles-home.component';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ProfilesHomeComponent,
  },
  {
    path:'create-profile',
    component:ProfileCreateComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
