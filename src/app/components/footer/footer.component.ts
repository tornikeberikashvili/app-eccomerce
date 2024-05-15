import { Component } from '@angular/core';
import {FOOTER_MENU} from "../../data/footer-manu";
import {FooterLinkItemComponent} from "./footer-link-item/footer-link-item.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    FooterLinkItemComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  footerMenu = FOOTER_MENU;
}
