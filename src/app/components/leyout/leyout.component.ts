import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-leyout',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './leyout.component.html',
  styleUrl: './leyout.component.scss'
})
export class LeyoutComponent {

}
