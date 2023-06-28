import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './models/job';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {}
  
  getAllJobApplications(): Observable<any> {
    return this.http.get("http://localhost:3000" + "/jobs")
  }

  getJobApplicationsForAUser(userId: any): Observable<any> {
    return this.http.get("http://localhost:3000/" + "user/appliedJobs/" + userId);
  }

  getJobApplicationsSearch(userId: any): Observable<any> {
    return this.http.get("http://localhost:3000/" + "user/appliedJobs/", userId);
  }

  addJobToUser(userId: any, jobId: any): Observable<any> {
    return this.http.post("http://localhost:3000/" + "user/appliedJobs/" + userId + "/" + jobId, null);
  }

  addUsertoJob(user: User, jobId: any): Observable<any> {
    return this.http.post("http://localhost:3000/" + "jobs/appliedUsers/" + jobId, user);
  }

  getUsersFromJob(jobId: any): Observable<any> {
    return this.http.get("http://localhost:3000/" + "jobs/appliedUsers/" + jobId);
  }
  
  getJob(jobId: any): Observable<any> {
    return this.http.get("http://localhost:3000/jobs/" + jobId);
  }

  addJob(job: Job): Observable<any> {
    return this.http.post("http://localhost:3000/jobs/", job);
  }

  updateJob(job: Job): Observable<any> {
    return this.http.put("http://localhost:3000/jobs/" + job._id, job);
  }

  deleteJob(jobId: any): Observable<any> {
    return this.http.delete("http://localhost:3000/jobs/" + jobId);
  }

}
