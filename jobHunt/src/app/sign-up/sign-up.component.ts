import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  fullName: string = "";
  email: string = "";
  password: string = "";
  isCompany: boolean = false;
  userType: string = "";

  constructor(private router: Router, private authService: AuthService) { }

  signUp(): void {
    this.isCompany = (this.userType === "company") ? true : false;
    this.authService.signUp(this.email, this.password, this.fullName, this.isCompany);
  }

  redirectToSignIn() {
    this.router.navigate(['/signin']);
  }

}
