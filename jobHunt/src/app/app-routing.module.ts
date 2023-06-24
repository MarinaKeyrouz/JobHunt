import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'jobs', component:HomeComponent},
  {path:'entreprise', component:HomeComponent},
  {path:'salaire', component:HomeComponent},
  {path:'account', component:AccountComponent},
  {path:'signin', component:SignInComponent},
  {path:'signup', component:SignUpComponent},
  {path:'myapplications', component:MyApplicationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
