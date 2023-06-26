import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  connectedUser:any = null;

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 
    this.isLogged();
  }
  
  signIn(email: any, password: any): Observable<any> {
    return this.http.post(this.apiUrl + "/signin", {email: email, password: password}, { withCredentials: true });
  }

  signOut(): Observable<any> {
    console.log("logout");
    return this.http.post(this.apiUrl + "/signout", { withCredentials: true });
  }

  signUp(email: any, password: any, fullName: any, isCompany: any): Observable<any> {
    return this.http.post(this.apiUrl + "/signup", {email: email, password: password, fullName: fullName, isCompany: isCompany}, { withCredentials: true })
  }

  isLogged() {
    this.http.get(this.apiUrl + "/isLogged",  { withCredentials: true }).subscribe(
      (connectedUser) => {
        this.connectedUser = connectedUser;
        console.log(this.connectedUser);
        console.log("connected");
      },
      (error) => {
        console.log("not connected");
      }
    )
  }

}
