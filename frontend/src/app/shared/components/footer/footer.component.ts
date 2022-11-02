import { Component } from '@angular/core';
import { ROUTER_LINKS } from '../../constants/router-links';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public readonly ROUTER_LINKS = ROUTER_LINKS;

  constructor() { }
}
