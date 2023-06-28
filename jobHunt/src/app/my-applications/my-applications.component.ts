import { Component } from '@angular/core';
import { JobApplicationService } from '../job-application.service';
import { Job } from '../models/job';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})

export class MyApplicationsComponent {
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

  onlyUnique(value: any, index: any, array: string | any[]) {
    return array.indexOf(value) === index;
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
    var unique = this.appliedJobsId.filter(this.onlyUnique);
    for (const jobId of unique) {
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
