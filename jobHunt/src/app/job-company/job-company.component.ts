import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApplicationService } from '../job-application.service';
import { JobCardComponent } from '../job-card/job-card.component';
import { Job } from '../models/job';

@Component({
  selector: 'app-job-company',
  templateUrl: './job-company.component.html',
  styleUrls: ['./job-company.component.scss']
})
export class JobCompanyComponent {

  id: any;
  job!: Job;
 
  constructor(private route: ActivatedRoute, private jobCard: JobCardComponent, public jobApplicationService: JobApplicationService, private router: Router) {
    this.job = jobCard.job;
  }

  ngOnInit(): void {
    this.job = {title: "", company: "", location: "", description: "", date: ""};
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("id from comp" + this.id);
    this.jobApplicationService.getJob(this.id).subscribe(
      (job: Job) => {
        this.job = job;
      },
      (error) => {
        console.log("Error");
      }
    );
  }

  updateJob(): void {
    this.jobApplicationService.updateJob(this.job).subscribe(
      () => {
        this.router.navigate(["/jobs"]);
      },
      (error: any) => {
        console.log("Error update job");
      }
    )
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



}
