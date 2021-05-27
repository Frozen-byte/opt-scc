import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'opt-site-toolbar',
  templateUrl: './site-toolbar.component.html',
  styleUrls: ['./site-toolbar.component.scss'],
})
export class SiteToolbarComponent implements OnInit {
  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {}
}
