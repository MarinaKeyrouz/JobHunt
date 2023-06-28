import { Component } from '@angular/core';
import { JobApplicationService } from '../job-application.service';
import { AuthService } from '../auth.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent {

  constructor(private jobApplicationService: JobApplicationService, public authService: AuthService) { }

  job: Job = {
    _id: "",
    title: "",
    company: this.authService.connectedUser.fullName,
    location: "",
    description: "",
    date: this.getTodayDate(),
    appliedUsers: [],
  };

  addJob(): void {
    this.jobApplicationService.addJob(this.job).subscribe(
      (job: Job) => {
        console.log("Job Added");
        this.jobApplicationService.addJobToUser(this.authService.connectedUser._id, job._id).subscribe(
          () => {
            console.log("Job Added");
          },
          (error: any) => {
            console.log("Error add job");
          }
        )
      },
      (error: any) => {
        console.log("Error add job");
      }
    )
  }


  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
}
