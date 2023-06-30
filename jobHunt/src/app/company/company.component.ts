import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
import { JobApplicationService } from '../job-application.service';
import { Job } from '../models/job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  @Input()
  company!: User;

  constructor(public authService: AuthService, public jobApplicationService: JobApplicationService, public router: Router) { }

  jobs: Job[] = [];

  ngOnInit() { }

  viewJobs(companyId: any): void {
    this.router.navigate(['/companyJobs'], { queryParams: { companyId: companyId } });

  }

}
