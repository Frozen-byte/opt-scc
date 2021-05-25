import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'opt-root',
  templateUrl: './opt.component.html',
  styleUrls: ['./opt.component.css'],
})
export class OptComponent {
  @HostBinding('class.theme-alternate') themeToggle = false;
}
