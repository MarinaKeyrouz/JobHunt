import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://example.com/api'; // Replace with your API endpoint
  private loggedIn: boolean = false;

  private email: string = "";


  constructor(private http: HttpClient) { }
  
  signIn(email: string, password: string): boolean {
    // Simulate sign-in logic here
    // Check if the provided email and password are valid
    // You can use an API call or any other authentication mechanism

    // For example, let's assume the email is "admin" and password is "password"
    if (email === 'admin' && password === 'password') {
      this.loggedIn = true;
      return true;
    } else {
      this.loggedIn = false;
      return false;
    }
  }

  signUp(email: string, password: string): any {
    // Simulate sign-up logic here
    // Check if the provided email is available and perform any necessary validation

    // For example, let's assume the email is available
    this.loggedIn = true;
    return this.http.get("http://localhost:3000/notes")
    
  }

  signOut(): void {
    // Perform sign-out logic here
    // Reset any necessary authentication-related data or tokens

    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

}
