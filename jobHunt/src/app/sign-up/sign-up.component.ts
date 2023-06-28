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
  userType: string = "";
  isCompany: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  signUp(): void {
    if (this.userType === "company") {
      this.isCompany = true;
    }
    this.authService.signUp(this.email, this.password, this.fullName, this.isCompany).subscribe(
      (userInfo: any) => {
        this.authService.isLogged();
        this.authService.connectedUser = userInfo;
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  redirectToSignIn() {
    this.router.navigate(['/signin']);
  }

}
