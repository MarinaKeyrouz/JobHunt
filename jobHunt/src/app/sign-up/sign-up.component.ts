import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";

  constructor(private router: Router, private authService: AuthService) {}

  signUp(): void {
    this.authService.signUp(this.email, this.password);
    // Perform any necessary actions upon successful sign-up
  }

  redirectToSignIn() {
    this.router.navigate(['/signin']);
  }

}
