import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { UnderHeaderComponent } from './under-header/under-header.component';
import { FooterComponent } from './footer/footer.component';
import { JobCardComponent } from './job-card/job-card.component';
import { AccountComponent } from './account/account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { AddJobComponent } from './add-job/add-job.component';
import { JobsComponent } from './jobs/jobs.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { ApplicationsComponent } from './applications/applications.component';
import { CompanyJobsComponent } from './company-jobs/company-jobs.component';
import { UserCardComponent } from './user-card/user-card.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { SearchComponent } from './search/search.component';
import { NosExpertsComponent } from './nos-experts/nos-experts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UnderHeaderComponent,
    FooterComponent,
    JobCardComponent,
    AccountComponent,
    SignInComponent,
    SignUpComponent,
    MyApplicationsComponent,
    AddJobComponent,
    JobsComponent,
    CompaniesComponent,
    CompanyComponent,
    ApplicationsComponent,
    CompanyJobsComponent,
    UserCardComponent,
    MyOffersComponent,
    SearchComponent,
    NosExpertsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
