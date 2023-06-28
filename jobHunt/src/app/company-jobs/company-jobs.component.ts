import { Component } from '@angular/core';
import { Job } from '../models/job';
import { JobApplicationService } from '../job-application.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.scss']
})
export class CompanyJobsComponent {
  appliedJobs: any[] = [];
  appliedJobsId: any[] = [];
  result: any;
  hideButton = true;
  job: Job = new Job;
  companyId: string = "";

  constructor(public jobApplicationService: JobApplicationService, public authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.companyId = params['companyId'];
      this.getMyApplications(this.companyId);
    });
  }

  getMyApplications(companyId: any) {
    this.jobApplicationService.getJobApplicationsForAUser(companyId).subscribe(
      (appliedJobsId: any) => {
        this.appliedJobsId = appliedJobsId;
        if (this.appliedJobsId.length != 0) {
          this.loadAppliedJobs();
        }
      },
      (error: any) => {
        console.log("Error");
      }
    );
  }

  async fetchJob(jobId: string): Promise<Job> {
    return new Promise<Job>((resolve, reject) => {
      this.jobApplicationService.getJob(jobId).subscribe(
        (appliedJob: Job) => {
          resolve(appliedJob);
        },
        (error: any) => {
          console.log("Error getting job");
          reject(error);
        }
      );
    });
  }

  async loadAppliedJobs() {
    this.appliedJobs = [];
    for (const jobId of this.appliedJobsId) {
      try {
        const appliedJob = await this.fetchJob(jobId);
        this.appliedJobs.push(appliedJob);
      } catch (error) {
        console.log("Error fetching job:", error);
      }
    }
    console.log(this.appliedJobs);
  }

}
