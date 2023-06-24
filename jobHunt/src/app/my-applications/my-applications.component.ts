import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from '../job-application.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})

export class MyApplicationsComponent {
  appliedJobs: any[] = [];

  constructor(public jobApplicationService: JobApplicationService) {}

  ngOnInit(): void {
    this.getMyApplications();
  }

  getMyApplications() {
    this.jobApplicationService.getAllJobApplications().subscribe(
      (jobs: any) => {
        this.appliedJobs = jobs.data;
      },
      (error: any) => {
        console.log("Error")
      }
    )
  }

}
