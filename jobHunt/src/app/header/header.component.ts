import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JobApplicationService } from '../job-application.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: String = "";

  constructor(public router: Router, public jobApplicationService: JobApplicationService, public authService: AuthService) { 
  }

  search(searchTerm: String) {
    this.router.navigate(['/search'], { queryParams: { searchTerm } });
  }

}
