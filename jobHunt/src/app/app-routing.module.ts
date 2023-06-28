import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { AddJobComponent } from './add-job/add-job.component';
import { JobsComponent } from './jobs/jobs.component';
import { CompaniesComponent } from './companies/companies.component';
import { ApplicationsComponent } from './applications/applications.component';
import { CompanyJobsComponent } from './company-jobs/company-jobs.component';
import { MyOffersComponent } from './my-offers/my-offers.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'jobs', component:JobsComponent},
  {path: 'companies', component:CompaniesComponent},
  {path: 'salaire', component:HomeComponent},
  {path: 'account', component:AccountComponent},
  {path: 'signin', component:SignInComponent},
  {path: 'signup', component:SignUpComponent},
  {path: 'myapplications', component:MyApplicationsComponent},
  {path: 'addJob', component:AddJobComponent},
  {path: 'candidatures', component:ApplicationsComponent},
  {path: 'companyJobs', component:CompanyJobsComponent},
  {path: 'myOffers', component:MyOffersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
