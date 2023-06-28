import { Component } from '@angular/core';
import { JobApplicationService } from '../job-application.service';
import { AuthService } from '../auth.service';
import { Job } from '../models/job';
import { User } from '../models/user';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent {
  appliedJobs: any[] = [];
  appliedJobsId: any[] = [];
  result: any;
  hideButton = true;
  job: Job = new Job;
  users: User[] = [];

  constructor(public jobApplicationService: JobApplicationService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.getMyApplications();
  }

  getMyApplications() {
    this.jobApplicationService.getJobApplicationsForAUser(this.authService.connectedUser._id).subscribe(
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
