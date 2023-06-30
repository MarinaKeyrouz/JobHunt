import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  fullName: string = "";
  email: string = "";
  isCompany: boolean = false;
  isEditing: boolean = false;
  isSaving: boolean = false;
  

  constructor(public authService: AuthService, private router: Router) { 
    this.fullName = this.authService.connectedUser.fullName;
    this.email = this.authService.connectedUser.email;
  }

  toggleEditMode() {
    if (this.isEditing) {
      this.isEditing = false;
      this.isSaving = true;
      this.authService.updateUser(this.fullName).subscribe(
        () => {
          console.log("User Updated");
          this.authService.isLogged();
        },
        (error: any) => {
          console.log("Error update user");
        }
      )
      this.isSaving = false;
    } else {
      this.isEditing = true;
    }
  }

  handleCVUpload(event: any) {
    const file = event.target.files[0];
  }

  signOut() {
    this.authService.signOut().subscribe(
      () => {
        this.router.navigate(['/home']);
        this.authService.connectedUser = null;
      },
      (error) => {
      }
    );
  }

}
