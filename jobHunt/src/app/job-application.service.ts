import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './models/job';
import { Observable } from 'rxjs';

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

  getJob(jobId: any): Observable<any> {
    console.log(jobId);
    return this.http.get("http://localhost:3000/jobs/" + jobId);
  }

  updateJob(job: Job): Observable<any> {
    return this.http.put("http://localhost:3000/jobs/" + job._id, job);
  }

  deleteJob(jobId: any): Observable<any> {
    return this.http.delete("http://localhost:3000/jobs/" + jobId);
  }

}
