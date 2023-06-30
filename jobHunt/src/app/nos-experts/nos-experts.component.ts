import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nos-experts',
  templateUrl: './nos-experts.component.html',
  styleUrls: ['./nos-experts.component.scss']
})
export class NosExpertsComponent {

  constructor(public router: Router, public authService: AuthService) { }
}
