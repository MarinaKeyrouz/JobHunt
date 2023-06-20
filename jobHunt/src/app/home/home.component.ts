import { Component } from '@angular/core';
import { Job } from '../models/job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  jobs: Job[] = [
    { title: 'Software Developer', company: 'ABC Company', location: 'City A', description: 'Job description 1', date: 'June 1, 2023' },
    { title: 'Data Analyst', company: 'XYZ Inc.', location: 'City B', description: 'Job description 2', date: 'June 2, 2023' },
    { title: 'Web Designer', company: '123 Design Studio', location: 'City C', description: 'Job description 3', date: 'June 3, 2023' },
    { title: 'Software Developer', company: 'ABC Company', location: 'City A', description: 'Job description 1', date: 'June 1, 2023' },
    { title: 'Data Analyst', company: 'XYZ Inc.', location: 'City B', description: 'Job description 2', date: 'June 2, 2023' }
  ];
}
