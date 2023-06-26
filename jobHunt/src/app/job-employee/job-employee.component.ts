import { Component } from '@angular/core';
import { JobApplicationService } from '../job-application.service';
import { Job } from '../models/job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-employee',
  templateUrl: './job-employee.component.html',
  styleUrls: ['./job-employee.component.scss']
})
export class JobEmployeeComponent {

  id: any;
  job: Job | undefined;

  constructor(public jobApplicationService: JobApplicationService, private router: Router) {}

}
