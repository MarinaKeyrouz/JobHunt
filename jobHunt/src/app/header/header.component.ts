import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showSearch: boolean = false;

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
}
