import { Component } from '@angular/core';
import { Job } from '../models/job';
import { JobApplicationService } from '../job-application.service';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {

  jobs: Job[] = [];
  users: any[] = [];
  appliedJobs: any[] = [];
  appliedJobsId: any[] = [];
  result: any;
  hideButton = true;
  job: Job = new Job;

  constructor(public jobApplicationService: JobApplicationService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.getMyApplications()
  }

  onlyUnique(value: any, index: any, array: string | any[]) {
    return array.indexOf(value) === index;
  }

  getAllAppliedUsers() {
    this.appliedJobs.forEach(
      (elem: any) => {
        elem.forEach(
          (job: Job) => {
            job.appliedUsers.forEach(
              (user: User) => {
                const newElem = {
                  fullName: user.fullName,
                  cv: user.cv,
                  jobTitle: job.title,
                }
                this.users.push(newElem);
              }
            )
          }
        )
      }
    )
    this.users = this.users.filter(this.onlyUnique);
    console.log(this.users);
  }

  getMyApplications() {
    this.jobApplicationService.getJobApplicationsForAUser(this.authService.connectedUser._id).subscribe(
      (appliedJobsId: any) => {
        this.appliedJobsId = appliedJobsId;
        if (this.appliedJobsId.length != 0) {
          this.loadAppliedJobs().then(
            () => {
              this.getAllAppliedUsers();
            }
          );

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
  }
}
