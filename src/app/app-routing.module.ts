import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component'
import { RegisterComponent } from './shared/register/register.component';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path:'home',
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'profiles',
    loadChildren:()=>import('./profiles/profiles.module').then(m=>m.ProfilesModule)
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
