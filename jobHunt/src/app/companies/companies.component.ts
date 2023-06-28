import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {
  constructor(public authService: AuthService) { }

  companies: User[] = [];

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.authService.getAllCompanies().subscribe(
      (companies: User[]) => {
        this.companies = companies;
      },
      (error: any) => {
        console.log("Error");
      }
    )
  }
}
