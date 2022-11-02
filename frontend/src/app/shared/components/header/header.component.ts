import { Component } from '@angular/core';
import { ROUTER_LINKS } from '../../constants/router-links';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public readonly ROUTER_LINKS = ROUTER_LINKS;

  constructor() { }
}
