import { Component } from '@angular/core';
import { Job } from '../models/job';
import { JobApplicationService } from '../job-application.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  constructor(public jobApplicationService: JobApplicationService) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  jobs: Job[] = [];

  getAllJobs() {
    this.jobApplicationService.getAllJobApplications().subscribe(
      (jobs: Job[]) => {
        this.jobs = jobs;
      },
      (error: any) => {
        console.log("Error");
      }
    )
  }
}
