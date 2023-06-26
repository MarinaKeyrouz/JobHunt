import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService) { 
    this.authService.isLogged();
  }

  saveAccountInfo(): void {
    this.toggleEditing();
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }

  handleCVUpload(event: any) {
    const file = event.target.files[0];
    // Additional logic for handling CV upload
  }

  signOut() {
    this.authService.signOut().subscribe(
      () => {

      },
      (error) => {
      }
    );
  }

}
