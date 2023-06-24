import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  email: string = "";
  password: string = "";

  constructor(private router: Router, private authService: AuthService) {}

  signIn(): void {
    const isAuthenticated = this.authService.signIn(this.email, this.password);
    if (isAuthenticated) {
      // Perform any necessary actions upon successful sign-in
    } else {
      // Handle invalid credentials or display an error message
    }
  }

  redirectToSignUp() {
    this.router.navigate(['/signup']);
  }

}
