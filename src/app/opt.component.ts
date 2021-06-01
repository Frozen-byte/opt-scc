import { Component, HostBinding } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'opt-root',
  templateUrl: './opt.component.html',
  styleUrls: ['./opt.component.scss'],
})
export class OptComponent {
  constructor(public themeService: ThemeService) {}
  @HostBinding('class.theme-alternate') get themeToggle(): boolean {
    return this.themeService.alternateTheme;
  }
}
