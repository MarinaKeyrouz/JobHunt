import { Component } from '@angular/core';
import { JobApplicationService } from '../job-application.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../models/job';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: String = "";
  jobs: Job[] = [];

  constructor(public jobApplicationService: JobApplicationService, public authService: AuthService, public router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      this.search();
    });
  }

  search() {
    this.jobApplicationService.getJobApplicationsSearch(this.searchTerm).subscribe(
      (jobs: Job[]) => {
        this.jobs = jobs;
      },
      (error: any) => {
        console.log("Error");
      }
    )
  }

  onlyUnique(value: any, index: any, array: string | any[]) {
    return array.indexOf(value) === index;
  }
}
