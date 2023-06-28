import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-under-header',
  templateUrl: './under-header.component.html',
  styleUrls: ['./under-header.component.scss']
})
export class UnderHeaderComponent {

  constructor(public authService: AuthService) { }

}
