import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  constructor(private http: HttpClient) { }

  getAllJobApplications(): any {
    return this.http.get("http://localhost:3000/jobs")
  }

  getJobApplicationsForAUser(email: string): any {
    return this.http.get("http://localhost:3000/notes")
  }

  getJobApplicationsSearch(email: string, search: string): any {
    return this.http.get("http://localhost:3000/notes")
  }

  ngOnInit(): void {}

  addJobApplication(email: string, note: any): any {
    return this.http.post("http://localhost:3000/notes", note);
  }

  deleteJobApplication(email: string, note: any): any {
    return this.http.delete("http://localhost:3000/notes", note);
  }

}
