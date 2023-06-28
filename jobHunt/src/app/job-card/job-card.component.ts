import { Component, Input } from '@angular/core';
import { Job } from '../models/job';
import { JobApplicationService } from '../job-application.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent {
  @Input()
  job!: Job;

  @Input()
  showButtons: boolean = true;

  isEditing: boolean = false;

  isSaving: boolean = false;

  constructor(public jobApplicationService: JobApplicationService, public authService: AuthService, public router: Router) { }

  toggleEditMode() {
    if (this.isEditing) {
      this.isEditing = false;
      this.isSaving = true;
      this.jobApplicationService.updateJob(this.job).subscribe(
        () => {
          console.log("Job Updated");
        },
        (error: any) => {
          console.log("Error update job");
        }
      )
      this.isSaving = false;
    } else {
      this.isEditing = true;
    }
  }

  updateJob(): void {
    if (this.isEditing) {
      this.jobApplicationService.updateJob(this.job).subscribe(
        () => {
          console.log("Job Updated");
        },
        (error: any) => {
          console.log("Error update job");
        }
      )
      this.isSaving = true;
    }

  }

  deleteJob(): void {
    this.jobApplicationService.deleteJob(this.job._id).subscribe(
      () => {
        console.log("Job Deleted");
      },
      (error: any) => {
        console.log("Error delete job");
      }
    )
  }

  applyToJob(): void {
    this.jobApplicationService.addJobToUser(this.authService.connectedUser._id, this.job._id).subscribe(
      () => {
        this.jobApplicationService.addUsertoJob(this.authService.connectedUser, this.job._id).subscribe(
          () => {},
          (error: any) => {
            console.log("Error apply job");
          }
        )
        console.log("Job Added");
      },
      (error: any) => {
        console.log("Error apply job");
      }
    )
  }

}
