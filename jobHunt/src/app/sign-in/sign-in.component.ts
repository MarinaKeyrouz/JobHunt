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
  isCompany: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  signIn(): void {
    this.authService.signIn(this.email, this.password).subscribe(
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

  redirectToSignUp() {
    this.router.navigate(['/signup']);
  }

}
