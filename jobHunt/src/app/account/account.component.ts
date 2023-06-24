import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  firstName: string = 'John';
  lastName: string = 'Doe';
  email: string = 'johndoe@example.com';
  number: string = '1234567890';
  isEditing: boolean = false;

  constructor(private authService: AuthService) { }

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
    this.authService.signOut();
  }

}
